
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.43.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function clamp(num, min, max) {
    	return num <= min
    		? min
        : num >= max
      		? max
          : num
    }
    function sum(numbers) {
      return numbers.reduce((all, i) => all + i, 0);
    }
    const STORAGE_KEY = 'TDJ-HELPER';
    function saveItem(data) {
      if (!data || !data.key) { return false;}
      let odata = getItem() || {};

      odata[data.key] = data.value;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(odata));
    }
    function getItem(key) {
      let data = localStorage.getItem(STORAGE_KEY);
      if (!data) { return null; }
      data = JSON.parse(data);

      return key ? data[key] : data;
    }
    const TYPES = {
      atk: {
        '天': [10, 4],
        '地': [5, 2],
        '荒': [7, 3],
      },
      def: {
        '天': [5, 2],
        '地': [10, 4],
        '荒': [7, 3],
      }
    };

    const ORI_PROPS = [
      { label: '--', score: 0, type: 'atk', },
      { label: '攻擊', score: 11, type: 'atk', },
      { label: '傷害', score: 10, type: 'atk', },
      { label: '穿透', score: 6, type: 'atk', },
      { label: '暴擊', score: 3, type: 'atk', },
      { label: '反擊', score: 0, type: 'atk', },

      { label: '氣血', score: 7, type: 'def', },
      { label: '免傷', score: 5, type: 'def', },
      { label: '防禦', score: 1, type: 'def', },
      { label: '抗暴', score: 0, type: 'def', },
    ];

    function genProps(props = ORI_PROPS) {
      return props.map(p => {
        p.range = TYPES[p.type];
        return p;
      })
    }

    const PROPS = genProps();

    function getProp(label, props = PROPS) {
      return props.find(p => p.label === label);
    }

    const BreakPoints = {
      '天': 164,
      '地': 143,
      '荒': 145,
    };

    const RockTypes = [
      '荒蟄',
      '頭狼',
      '幽魎',
      '羅鬼',

      '妖術師',
      '朱焰魔火',
      '九環朱蝮',

      '赤練鬼',
      '剛破鬼',
      '凶骸兵',

      '冥葵',
      '屍魔術士',

      '咒石兵',
      '冰魔蠍',
      '死魘鬼卒',

      '鬼面花蛛',
      '百眼翼魔',
    ];


    function cloneObj(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    const DefailtItem = { prop: '--', value: 5 };

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function createUrls() {
      let _urls = getItem('historeUrls') || [];

      const { subscribe, set, update } = writable(_urls);

      return {
        subscribe,

        add: (a) => update(n =>
          [...new Set( [...n, a] )]
        ),

        remove: (a) => update(n =>
          n.filter(i => i !== a)
        ),

        reset: () => set([]),
      };
    }

    const historeUrls = createUrls();

    const savedUrl = derived(
      historeUrls,
      $historeUrls => {
        saveItem({
          key: 'historeUrls',
          value: $historeUrls,
        });
        return $historeUrls;
      }
    );

    function createProps() {
      let _props = getItem('oriProps') || cloneObj(ORI_PROPS);

      const { subscribe, set, update } = writable(_props);

      return {
        subscribe,
        update,
        set,
        reset: () => set(cloneObj(ORI_PROPS)),
      };
    }

    const oriProps = createProps();

    const adjustProps = derived(
      oriProps,
      ($oriProps, set) => {
        saveItem({
          key: 'oriProps',
          value: $oriProps,
        });
        return $oriProps;
      }
    );

    /* src/Item.svelte generated by Svelte v3.43.0 */
    const file$3 = "src/Item.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    // (23:4) {#each $oriProps as _prop, index}
    function create_each_block$3(ctx) {
    	let option;
    	let t0_value = /*_prop*/ ctx[8].label + ' ' + /*_prop*/ ctx[8].score + "";
    	let t0;
    	let t1;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t0 = text(t0_value);
    			t1 = space();
    			option.__value = option_value_value = /*_prop*/ ctx[8].label;
    			option.value = option.__value;
    			add_location(option, file$3, 23, 6, 403);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t0);
    			append_dev(option, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$oriProps*/ 8 && t0_value !== (t0_value = /*_prop*/ ctx[8].label + ' ' + /*_prop*/ ctx[8].score + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*$oriProps*/ 8 && option_value_value !== (option_value_value = /*_prop*/ ctx[8].label)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(23:4) {#each $oriProps as _prop, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div1;
    	let select;
    	let t0;
    	let input0;
    	let t1;
    	let div0;
    	let input1;
    	let input1_style_value;
    	let mounted;
    	let dispose;
    	let each_value = /*$oriProps*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			input0 = element("input");
    			t1 = space();
    			div0 = element("div");
    			input1 = element("input");
    			attr_dev(select, "class", "svelte-1dran9s");
    			if (/*item*/ ctx[0].prop === void 0) add_render_callback(() => /*select_change_handler*/ ctx[5].call(select));
    			add_location(select, file$3, 21, 2, 327);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "max", /*max*/ ctx[2]);
    			attr_dev(input0, "min", /*min*/ ctx[1]);
    			attr_dev(input0, "class", "svelte-1dran9s");
    			add_location(input0, file$3, 29, 2, 517);
    			attr_dev(input1, "type", "range");
    			attr_dev(input1, "max", /*max*/ ctx[2]);
    			attr_dev(input1, "min", /*min*/ ctx[1]);
    			attr_dev(input1, "style", input1_style_value = `--max: ${/*max*/ ctx[2]};`);
    			attr_dev(input1, "class", "svelte-1dran9s");
    			add_location(input1, file$3, 37, 4, 629);
    			attr_dev(div0, "class", "flex svelte-1dran9s");
    			add_location(div0, file$3, 36, 2, 606);
    			attr_dev(div1, "class", "flex list-item svelte-1dran9s");
    			add_location(div1, file$3, 20, 0, 296);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*item*/ ctx[0].prop);
    			append_dev(div1, t0);
    			append_dev(div1, input0);
    			set_input_value(input0, /*item*/ ctx[0].value);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, input1);
    			set_input_value(input1, /*item*/ ctx[0].value);

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[5]),
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[6]),
    					listen_dev(input1, "change", /*input1_change_input_handler*/ ctx[7]),
    					listen_dev(input1, "input", /*input1_change_input_handler*/ ctx[7])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$oriProps*/ 8) {
    				each_value = /*$oriProps*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*item, $oriProps*/ 9) {
    				select_option(select, /*item*/ ctx[0].prop);
    			}

    			if (dirty & /*max*/ 4) {
    				attr_dev(input0, "max", /*max*/ ctx[2]);
    			}

    			if (dirty & /*min*/ 2) {
    				attr_dev(input0, "min", /*min*/ ctx[1]);
    			}

    			if (dirty & /*item, $oriProps*/ 9 && to_number(input0.value) !== /*item*/ ctx[0].value) {
    				set_input_value(input0, /*item*/ ctx[0].value);
    			}

    			if (dirty & /*max*/ 4) {
    				attr_dev(input1, "max", /*max*/ ctx[2]);
    			}

    			if (dirty & /*min*/ 2) {
    				attr_dev(input1, "min", /*min*/ ctx[1]);
    			}

    			if (dirty & /*max*/ 4 && input1_style_value !== (input1_style_value = `--max: ${/*max*/ ctx[2]};`)) {
    				attr_dev(input1, "style", input1_style_value);
    			}

    			if (dirty & /*item, $oriProps*/ 9) {
    				set_input_value(input1, /*item*/ ctx[0].value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let max;
    	let min;
    	let $oriProps;
    	validate_store(oriProps, 'oriProps');
    	component_subscribe($$self, oriProps, $$value => $$invalidate(3, $oriProps = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Item', slots, []);
    	let { position = '天' } = $$props;
    	let { item = cloneObj(DefailtItem) } = $$props;
    	const writable_props = ['position', 'item'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Item> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		item.prop = select_value(this);
    		$$invalidate(0, item);
    	}

    	function input0_input_handler() {
    		item.value = to_number(this.value);
    		$$invalidate(0, item);
    	}

    	function input1_change_input_handler() {
    		item.value = to_number(this.value);
    		$$invalidate(0, item);
    	}

    	$$self.$$set = $$props => {
    		if ('position' in $$props) $$invalidate(4, position = $$props.position);
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    	};

    	$$self.$capture_state = () => ({
    		clamp,
    		getProp,
    		cloneObj,
    		PROPS,
    		DefailtItem,
    		oriProps,
    		position,
    		item,
    		min,
    		max,
    		$oriProps
    	});

    	$$self.$inject_state = $$props => {
    		if ('position' in $$props) $$invalidate(4, position = $$props.position);
    		if ('item' in $$props) $$invalidate(0, item = $$props.item);
    		if ('min' in $$props) $$invalidate(1, min = $$props.min);
    		if ('max' in $$props) $$invalidate(2, max = $$props.max);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*item, position*/ 17) {
    			$$invalidate(2, [max, min] = getProp(item.prop).range[position] || [], max, (($$invalidate(1, min), $$invalidate(0, item)), $$invalidate(4, position)));
    		}
    	};

    	return [
    		item,
    		min,
    		max,
    		$oriProps,
    		position,
    		select_change_handler,
    		input0_input_handler,
    		input1_change_input_handler
    	];
    }

    class Item extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { position: 4, item: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Item",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get position() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set position(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get item() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set item(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/History.svelte generated by Svelte v3.43.0 */
    const file$2 = "src/History.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (38:2) {#each $savedUrl as url (url)}
    function create_each_block$2(key_1, ctx) {
    	let div;
    	let button;
    	let t1;
    	let span;
    	let raw_value = itemTitle(/*url*/ ctx[5]) + "";
    	let t2;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[2](/*url*/ ctx[5]);
    	}

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[3](/*url*/ ctx[5]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			button.textContent = "⨯";
    			t1 = space();
    			span = element("span");
    			t2 = space();
    			attr_dev(button, "class", "btn svelte-1iaw0d8");
    			add_location(button, file$2, 39, 6, 786);
    			add_location(span, file$2, 43, 6, 898);
    			attr_dev(div, "class", "li svelte-1iaw0d8");
    			add_location(div, file$2, 38, 4, 763);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			append_dev(div, t1);
    			append_dev(div, span);
    			span.innerHTML = raw_value;
    			append_dev(div, t2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button, "click", prevent_default(click_handler), false, true, false),
    					listen_dev(span, "click", prevent_default(click_handler_1), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$savedUrl*/ 1 && raw_value !== (raw_value = itemTitle(/*url*/ ctx[5]) + "")) span.innerHTML = raw_value;		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(38:2) {#each $savedUrl as url (url)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let details;
    	let summary;
    	let t1;
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value = /*$savedUrl*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*url*/ ctx[5];
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			details = element("details");
    			summary = element("summary");
    			summary.textContent = "魂石紀錄:";
    			t1 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(summary, file$2, 32, 2, 673);
    			attr_dev(div, "class", "ul svelte-1iaw0d8");
    			add_location(div, file$2, 36, 2, 709);
    			details.open = true;
    			attr_dev(details, "class", "aside svelte-1iaw0d8");
    			add_location(details, file$2, 31, 0, 642);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, details, anchor);
    			append_dev(details, summary);
    			append_dev(details, t1);
    			append_dev(details, div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*applyUrl, $savedUrl, itemTitle, historeUrls*/ 3) {
    				each_value = /*$savedUrl*/ ctx[0];
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block$2, null, get_each_context$2);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(details);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function itemTitle(url) {
    	let data = JSON.parse(url);

    	return [
    		genTick('', data.title + '‧' + data.position),
    		genTick('計分', data.score),
    		...data.items.filter(i => i.prop !== '--').map(i => genTick(i.prop, i.value))
    	].join('');
    }

    function genTick(t1 = '', t2 = '') {
    	return `<span class="i ib">
      <sup>${t1}</sup>
      ${t2}
    </span>`;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $savedUrl;
    	validate_store(savedUrl, 'savedUrl');
    	component_subscribe($$self, savedUrl, $$value => $$invalidate(0, $savedUrl = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('History', slots, []);
    	const dispatch = createEventDispatcher();

    	function applyUrl(url) {
    		dispatch('apply', { url });
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<History> was created with unknown prop '${key}'`);
    	});

    	const click_handler = url => historeUrls.remove(url);
    	const click_handler_1 = url => applyUrl(url);

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		historeUrls,
    		savedUrl,
    		applyUrl,
    		itemTitle,
    		genTick,
    		$savedUrl
    	});

    	return [$savedUrl, applyUrl, click_handler, click_handler_1];
    }

    class History extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "History",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/Settings.svelte generated by Svelte v3.43.0 */
    const file$1 = "src/Settings.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[8] = list;
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (26:8) {#if prop.label !== '--'}
    function create_if_block(ctx) {
    	let div;
    	let t0_value = /*prop*/ ctx[7].label + "";
    	let t0;
    	let t1;
    	let input0;
    	let t2;
    	let input1;
    	let t3;
    	let mounted;
    	let dispose;

    	function input0_input_handler() {
    		/*input0_input_handler*/ ctx[4].call(input0, /*each_value*/ ctx[8], /*prop_index*/ ctx[9]);
    	}

    	function input1_change_input_handler() {
    		/*input1_change_input_handler*/ ctx[5].call(input1, /*each_value*/ ctx[8], /*prop_index*/ ctx[9]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			input1 = element("input");
    			t3 = space();
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "max", "20");
    			attr_dev(input0, "step", "1");
    			attr_dev(input0, "min", "0");
    			add_location(input0, file$1, 28, 12, 534);
    			attr_dev(input1, "type", "range");
    			attr_dev(input1, "max", "20");
    			attr_dev(input1, "step", "1");
    			attr_dev(input1, "min", "0");
    			add_location(input1, file$1, 29, 12, 620);
    			add_location(div, file$1, 26, 10, 491);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, input0);
    			set_input_value(input0, /*prop*/ ctx[7].score);
    			append_dev(div, t2);
    			append_dev(div, input1);
    			set_input_value(input1, /*prop*/ ctx[7].score);
    			append_dev(div, t3);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", input0_input_handler),
    					listen_dev(input1, "change", input1_change_input_handler),
    					listen_dev(input1, "input", input1_change_input_handler)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*$oriProps*/ 2 && t0_value !== (t0_value = /*prop*/ ctx[7].label + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*$oriProps*/ 2 && to_number(input0.value) !== /*prop*/ ctx[7].score) {
    				set_input_value(input0, /*prop*/ ctx[7].score);
    			}

    			if (dirty & /*$oriProps*/ 2) {
    				set_input_value(input1, /*prop*/ ctx[7].score);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(26:8) {#if prop.label !== '--'}",
    		ctx
    	});

    	return block;
    }

    // (25:6) {#each $oriProps as prop}
    function create_each_block$1(ctx) {
    	let if_block_anchor;
    	let if_block = /*prop*/ ctx[7].label !== '--' && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*prop*/ ctx[7].label !== '--') {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(25:6) {#each $oriProps as prop}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let span;
    	let t1;
    	let div3;
    	let div0;
    	let t2;
    	let div2;
    	let fieldset;
    	let legend;
    	let t4;
    	let t5;
    	let div1;
    	let input0;
    	let t6;
    	let input1;
    	let mounted;
    	let dispose;
    	let each_value = /*$oriProps*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "⚙️";
    			t1 = space();
    			div3 = element("div");
    			div0 = element("div");
    			t2 = space();
    			div2 = element("div");
    			fieldset = element("fieldset");
    			legend = element("legend");
    			legend.textContent = "調整計分權重";
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			div1 = element("div");
    			input0 = element("input");
    			t6 = space();
    			input1 = element("input");
    			add_location(span, file$1, 16, 0, 211);
    			attr_dev(div0, "class", "dialog-overlay svelte-d31rkv");
    			add_location(div0, file$1, 19, 2, 285);
    			add_location(legend, file$1, 22, 6, 390);
    			add_location(fieldset, file$1, 21, 4, 373);
    			attr_dev(input0, "type", "submit");
    			input0.value = "✓";
    			add_location(input0, file$1, 36, 6, 790);
    			attr_dev(input1, "type", "reset");
    			add_location(input1, file$1, 37, 6, 846);
    			attr_dev(div1, "class", "flex jc-sb");
    			add_location(div1, file$1, 35, 4, 759);
    			attr_dev(div2, "class", "dialog-content svelte-d31rkv");
    			add_location(div2, file$1, 20, 2, 340);
    			attr_dev(div3, "class", "dialog svelte-d31rkv");
    			div3.hidden = /*hidden*/ ctx[0];
    			add_location(div3, file$1, 18, 0, 246);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, fieldset);
    			append_dev(fieldset, legend);
    			append_dev(fieldset, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(fieldset, null);
    			}

    			append_dev(div2, t5);
    			append_dev(div2, div1);
    			append_dev(div1, input0);
    			append_dev(div1, t6);
    			append_dev(div1, input1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(span, "click", /*toggle*/ ctx[2], false, false, false),
    					listen_dev(div0, "click", /*toggle*/ ctx[2], false, false, false),
    					listen_dev(input0, "click", /*toggle*/ ctx[2], false, false, false),
    					listen_dev(input1, "click", /*reset*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$oriProps*/ 2) {
    				each_value = /*$oriProps*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(fieldset, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*hidden*/ 1) {
    				prop_dev(div3, "hidden", /*hidden*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $adjustProps;
    	let $oriProps;
    	validate_store(adjustProps, 'adjustProps');
    	component_subscribe($$self, adjustProps, $$value => $$invalidate(6, $adjustProps = $$value));
    	validate_store(oriProps, 'oriProps');
    	component_subscribe($$self, oriProps, $$value => $$invalidate(1, $oriProps = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Settings', slots, []);
    	let hidden = true;

    	function toggle() {
    		$$invalidate(0, hidden = !hidden);
    	}

    	function reset() {
    		oriProps.reset();
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler(each_value, prop_index) {
    		each_value[prop_index].score = to_number(this.value);
    		oriProps.set($oriProps);
    	}

    	function input1_change_input_handler(each_value, prop_index) {
    		each_value[prop_index].score = to_number(this.value);
    		oriProps.set($oriProps);
    	}

    	$$self.$capture_state = () => ({
    		adjustProps,
    		oriProps,
    		hidden,
    		toggle,
    		reset,
    		$adjustProps,
    		$oriProps
    	});

    	$$self.$inject_state = $$props => {
    		if ('hidden' in $$props) $$invalidate(0, hidden = $$props.hidden);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		hidden,
    		$oriProps,
    		toggle,
    		reset,
    		input0_input_handler,
    		input1_change_input_handler
    	];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.43.0 */
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[21] = list[i];
    	child_ctx[22] = list;
    	child_ctx[23] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[24] = list[i];
    	return child_ctx;
    }

    // (160:8) {#each RockTypes as rock}
    function create_each_block_1(ctx) {
    	let option;

    	const block = {
    		c: function create() {
    			option = element("option");
    			option.__value = /*rock*/ ctx[24];
    			option.value = option.__value;
    			add_location(option, file, 160, 10, 3448);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(160:8) {#each RockTypes as rock}",
    		ctx
    	});

    	return block;
    }

    // (183:4) {#each items as item, index}
    function create_each_block(ctx) {
    	let item;
    	let updating_item;
    	let current;

    	function item_item_binding(value) {
    		/*item_item_binding*/ ctx[14](value, /*item*/ ctx[21], /*each_value*/ ctx[22], /*index*/ ctx[23]);
    	}

    	let item_props = { position: /*position*/ ctx[0] };

    	if (/*item*/ ctx[21] !== void 0) {
    		item_props.item = /*item*/ ctx[21];
    	}

    	item = new Item({ props: item_props, $$inline: true });
    	binding_callbacks.push(() => bind(item, 'item', item_item_binding));

    	const block = {
    		c: function create() {
    			create_component(item.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(item, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const item_changes = {};
    			if (dirty & /*position*/ 1) item_changes.position = /*position*/ ctx[0];

    			if (!updating_item && dirty & /*items*/ 2) {
    				updating_item = true;
    				item_changes.item = /*item*/ ctx[21];
    				add_flush_callback(() => updating_item = false);
    			}

    			item.$set(item_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(item.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(item.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(item, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(183:4) {#each items as item, index}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let h1;
    	let a0;
    	let t1;
    	let ruby;
    	let t2;
    	let rt;
    	let t4;
    	let a1;
    	let t6;
    	let form;
    	let fieldset0;
    	let legend0;
    	let t7;
    	let input0;
    	let t8;
    	let datalist;
    	let t9;
    	let div0;
    	let label0;
    	let input1;
    	let t10;
    	let t11;
    	let label1;
    	let input2;
    	let t12;
    	let t13;
    	let label2;
    	let input3;
    	let t14;
    	let t15;
    	let fieldset1;
    	let legend1;
    	let t17;
    	let t18;
    	let fieldset2;
    	let legend2;
    	let t20;
    	let input4;
    	let input4_value_value;
    	let input4_style_value;
    	let t21;
    	let sub;
    	let t22;
    	let t23_value = /*output*/ ctx[3].max + "";
    	let t23;
    	let t24;
    	let div1;
    	let input5;
    	let input5_disabled_value;
    	let t25;
    	let input6;
    	let t26;
    	let input7;
    	let form_style_value;
    	let t27;
    	let history;
    	let t28;
    	let footer;
    	let settings;
    	let t29;
    	let ul;
    	let li0;
    	let t31;
    	let li1;
    	let t32;
    	let br;
    	let t33;
    	let a2;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = RockTypes;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*items*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	history = new History({ $$inline: true });
    	history.$on("apply", /*applyUrl*/ ctx[6]);
    	settings = new Settings({ $$inline: true });

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			a0 = element("a");
    			a0.textContent = "↤";
    			t1 = space();
    			ruby = element("ruby");
    			t2 = text("絕品魂石 評估\n    ");
    			rt = element("rt");
    			rt.textContent = "天地劫M";
    			t4 = space();
    			a1 = element("a");
    			a1.textContent = "↦";
    			t6 = space();
    			form = element("form");
    			fieldset0 = element("fieldset");
    			legend0 = element("legend");
    			t7 = text("絕‧魂石孔位\n      ");
    			input0 = element("input");
    			t8 = space();
    			datalist = element("datalist");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t9 = space();
    			div0 = element("div");
    			label0 = element("label");
    			input1 = element("input");
    			t10 = text("\n        天");
    			t11 = space();
    			label1 = element("label");
    			input2 = element("input");
    			t12 = text("\n        地");
    			t13 = space();
    			label2 = element("label");
    			input3 = element("input");
    			t14 = text("\n        荒");
    			t15 = space();
    			fieldset1 = element("fieldset");
    			legend1 = element("legend");
    			legend1.textContent = "副屬";
    			t17 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t18 = space();
    			fieldset2 = element("fieldset");
    			legend2 = element("legend");
    			legend2.textContent = "計分";
    			t20 = space();
    			input4 = element("input");
    			t21 = space();
    			sub = element("sub");
    			t22 = text("/ ");
    			t23 = text(t23_value);
    			t24 = space();
    			div1 = element("div");
    			input5 = element("input");
    			t25 = space();
    			input6 = element("input");
    			t26 = space();
    			input7 = element("input");
    			t27 = space();
    			create_component(history.$$.fragment);
    			t28 = space();
    			footer = element("footer");
    			create_component(settings.$$.fragment);
    			t29 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Made by Rplus";
    			t31 = space();
    			li1 = element("li");
    			t32 = text("計分標準參考來源：\n      ");
    			br = element("br");
    			t33 = space();
    			a2 = element("a");
    			a2.textContent = "魂石选择终极攻略 | NGA玩家社区";
    			attr_dev(a0, "href", "./naihe/");
    			attr_dev(a0, "title", "三途川選擇");
    			add_location(a0, file, 137, 2, 2941);
    			set_style(rt, "color", "#0003");
    			add_location(rt, file, 140, 4, 3005);
    			add_location(ruby, file, 138, 2, 2982);
    			attr_dev(a1, "href", "./weapon/");
    			attr_dev(a1, "title", "go to next");
    			add_location(a1, file, 142, 2, 3052);
    			add_location(h1, file, 136, 0, 2934);
    			attr_dev(input0, "class", "title svelte-1c4x4cl");
    			attr_dev(input0, "type", "search");
    			attr_dev(input0, "list", "rock-types");
    			add_location(input0, file, 152, 6, 3258);
    			attr_dev(datalist, "id", "rock-types");
    			add_location(datalist, file, 158, 6, 3377);
    			add_location(legend0, file, 150, 4, 3230);
    			attr_dev(input1, "type", "radio");
    			attr_dev(input1, "name", "position");
    			input1.__value = "天";
    			input1.value = input1.__value;
    			input1.checked = true;
    			/*$$binding_groups*/ ctx[11][0].push(input1);
    			add_location(input1, file, 166, 8, 3578);
    			add_location(label0, file, 165, 6, 3562);
    			attr_dev(input2, "type", "radio");
    			attr_dev(input2, "name", "position");
    			input2.__value = "地";
    			input2.value = input2.__value;
    			/*$$binding_groups*/ ctx[11][0].push(input2);
    			add_location(input2, file, 170, 8, 3704);
    			add_location(label1, file, 169, 6, 3688);
    			attr_dev(input3, "type", "radio");
    			attr_dev(input3, "name", "position");
    			input3.__value = "荒";
    			input3.value = input3.__value;
    			/*$$binding_groups*/ ctx[11][0].push(input3);
    			add_location(input3, file, 174, 8, 3822);
    			add_location(label2, file, 173, 6, 3806);
    			attr_dev(div0, "class", "flex jc-se");
    			add_location(div0, file, 164, 4, 3531);
    			add_location(fieldset0, file, 149, 2, 3215);
    			add_location(legend1, file, 181, 4, 3961);
    			add_location(fieldset1, file, 180, 2, 3946);
    			add_location(legend2, file, 188, 4, 4119);
    			attr_dev(input4, "type", "text");
    			input4.readOnly = true;
    			attr_dev(input4, "class", "output svelte-1c4x4cl");
    			input4.value = input4_value_value = /*output*/ ctx[3].score;
    			attr_dev(input4, "style", input4_style_value = `--score: ${/*output*/ ctx[3].score}; --max: ${/*output*/ ctx[3].max}`);
    			add_location(input4, file, 189, 4, 4143);
    			attr_dev(sub, "class", "max svelte-1c4x4cl");
    			add_location(sub, file, 194, 4, 4293);
    			attr_dev(input5, "class", "save svelte-1c4x4cl");
    			attr_dev(input5, "type", "submit");
    			input5.value = "記錄";
    			input5.disabled = input5_disabled_value = !/*output*/ ctx[3].score;
    			add_location(input5, file, 197, 6, 4377);
    			attr_dev(input6, "type", "submit");
    			input6.value = "生成上下限";
    			attr_dev(input6, "class", "svelte-1c4x4cl");
    			add_location(input6, file, 204, 6, 4535);
    			attr_dev(input7, "type", "reset");
    			attr_dev(input7, "class", "svelte-1c4x4cl");
    			add_location(input7, file, 209, 6, 4645);
    			attr_dev(div1, "class", "flex jc-sb form-btns svelte-1c4x4cl");
    			add_location(div1, file, 196, 4, 4336);
    			attr_dev(fieldset2, "class", "");
    			add_location(fieldset2, file, 187, 2, 4095);
    			attr_dev(form, "class", "main");
    			attr_dev(form, "style", form_style_value = `--break-point: ${BreakPoints[/*position*/ ctx[0]]}`);
    			add_location(form, file, 145, 0, 3104);
    			add_location(li0, file, 219, 4, 4830);
    			add_location(br, file, 224, 6, 4896);
    			attr_dev(a2, "href", "https://bbs.nga.cn/read.php?tid=26383169&rand=456");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "rel", "noopener");
    			add_location(a2, file, 225, 6, 4907);
    			add_location(li1, file, 222, 4, 4869);
    			add_location(ul, file, 218, 2, 4821);
    			attr_dev(footer, "class", "footer flex jc-sb");
    			add_location(footer, file, 216, 0, 4769);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, a0);
    			append_dev(h1, t1);
    			append_dev(h1, ruby);
    			append_dev(ruby, t2);
    			append_dev(ruby, rt);
    			append_dev(h1, t4);
    			append_dev(h1, a1);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, form, anchor);
    			append_dev(form, fieldset0);
    			append_dev(fieldset0, legend0);
    			append_dev(legend0, t7);
    			append_dev(legend0, input0);
    			set_input_value(input0, /*title*/ ctx[2]);
    			append_dev(legend0, t8);
    			append_dev(legend0, datalist);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(datalist, null);
    			}

    			append_dev(fieldset0, t9);
    			append_dev(fieldset0, div0);
    			append_dev(div0, label0);
    			append_dev(label0, input1);
    			input1.checked = input1.__value === /*position*/ ctx[0];
    			append_dev(label0, t10);
    			append_dev(div0, t11);
    			append_dev(div0, label1);
    			append_dev(label1, input2);
    			input2.checked = input2.__value === /*position*/ ctx[0];
    			append_dev(label1, t12);
    			append_dev(div0, t13);
    			append_dev(div0, label2);
    			append_dev(label2, input3);
    			input3.checked = input3.__value === /*position*/ ctx[0];
    			append_dev(label2, t14);
    			append_dev(form, t15);
    			append_dev(form, fieldset1);
    			append_dev(fieldset1, legend1);
    			append_dev(fieldset1, t17);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(fieldset1, null);
    			}

    			append_dev(form, t18);
    			append_dev(form, fieldset2);
    			append_dev(fieldset2, legend2);
    			append_dev(fieldset2, t20);
    			append_dev(fieldset2, input4);
    			append_dev(fieldset2, t21);
    			append_dev(fieldset2, sub);
    			append_dev(sub, t22);
    			append_dev(sub, t23);
    			append_dev(fieldset2, t24);
    			append_dev(fieldset2, div1);
    			append_dev(div1, input5);
    			append_dev(div1, t25);
    			append_dev(div1, input6);
    			append_dev(div1, t26);
    			append_dev(div1, input7);
    			insert_dev(target, t27, anchor);
    			mount_component(history, target, anchor);
    			insert_dev(target, t28, anchor);
    			insert_dev(target, footer, anchor);
    			mount_component(settings, footer, null);
    			append_dev(footer, t29);
    			append_dev(footer, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t31);
    			append_dev(ul, li1);
    			append_dev(li1, t32);
    			append_dev(li1, br);
    			append_dev(li1, t33);
    			append_dev(li1, a2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[9]),
    					listen_dev(input1, "change", /*input1_change_handler*/ ctx[10]),
    					listen_dev(input2, "change", /*input2_change_handler*/ ctx[12]),
    					listen_dev(input3, "change", /*input3_change_handler*/ ctx[13]),
    					listen_dev(input5, "click", prevent_default(/*save*/ ctx[4]), false, true, false),
    					listen_dev(input6, "click", prevent_default(/*saveMMM*/ ctx[5]), false, true, false),
    					listen_dev(input7, "click", prevent_default(/*reset*/ ctx[7]), false, true, false),
    					listen_dev(form, "submit", prevent_default(submit), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*title*/ 4) {
    				set_input_value(input0, /*title*/ ctx[2]);
    			}

    			if (dirty & /*RockTypes*/ 0) {
    				each_value_1 = RockTypes;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(datalist, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*position*/ 1) {
    				input1.checked = input1.__value === /*position*/ ctx[0];
    			}

    			if (dirty & /*position*/ 1) {
    				input2.checked = input2.__value === /*position*/ ctx[0];
    			}

    			if (dirty & /*position*/ 1) {
    				input3.checked = input3.__value === /*position*/ ctx[0];
    			}

    			if (dirty & /*position, items*/ 3) {
    				each_value = /*items*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(fieldset1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*output*/ 8 && input4_value_value !== (input4_value_value = /*output*/ ctx[3].score) && input4.value !== input4_value_value) {
    				prop_dev(input4, "value", input4_value_value);
    			}

    			if (!current || dirty & /*output*/ 8 && input4_style_value !== (input4_style_value = `--score: ${/*output*/ ctx[3].score}; --max: ${/*output*/ ctx[3].max}`)) {
    				attr_dev(input4, "style", input4_style_value);
    			}

    			if ((!current || dirty & /*output*/ 8) && t23_value !== (t23_value = /*output*/ ctx[3].max + "")) set_data_dev(t23, t23_value);

    			if (!current || dirty & /*output*/ 8 && input5_disabled_value !== (input5_disabled_value = !/*output*/ ctx[3].score)) {
    				prop_dev(input5, "disabled", input5_disabled_value);
    			}

    			if (!current || dirty & /*position*/ 1 && form_style_value !== (form_style_value = `--break-point: ${BreakPoints[/*position*/ ctx[0]]}`)) {
    				attr_dev(form, "style", form_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(history.$$.fragment, local);
    			transition_in(settings.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(history.$$.fragment, local);
    			transition_out(settings.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(form);
    			destroy_each(each_blocks_1, detaching);
    			/*$$binding_groups*/ ctx[11][0].splice(/*$$binding_groups*/ ctx[11][0].indexOf(input1), 1);
    			/*$$binding_groups*/ ctx[11][0].splice(/*$$binding_groups*/ ctx[11][0].indexOf(input2), 1);
    			/*$$binding_groups*/ ctx[11][0].splice(/*$$binding_groups*/ ctx[11][0].indexOf(input3), 1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t27);
    			destroy_component(history, detaching);
    			if (detaching) detach_dev(t28);
    			if (detaching) detach_dev(footer);
    			destroy_component(settings);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function isValidProp(item) {
    	return item.prop !== '--';
    }

    function asideScrollToBottom() {
    	// dirty dom
    	let ul = document.querySelector('.aside .ul');

    	if (!ul) {
    		return;
    	}

    	ul.scrollTop = ul.scrollHeight;
    }

    function submit() {
    	
    }

    function instance($$self, $$props, $$invalidate) {
    	let customProps;
    	let output;
    	let $oriProps;
    	validate_store(oriProps, 'oriProps');
    	component_subscribe($$self, oriProps, $$value => $$invalidate(8, $oriProps = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let position = '天';
    	let items = new Array(4);
    	let title = '';

    	function updateScores(e) {
    		$$invalidate(1, items[e.detail.order] = e.detail, items);
    	}

    	function sumItems(items) {
    		return items.reduce(
    			(all, i) => {
    				let _p = getProp(i.prop, customProps);
    				let _max = _p.range[position][0];
    				all.score += _p.score * i.value;
    				all.max += _p.score * _max;
    				return all;
    			},
    			{ score: 0, max: 0 }
    		);
    	}

    	function save() {
    		if (!output.score) {
    			return;
    		}

    		historeUrls.add(JSON.stringify({
    			title,
    			position,
    			items,
    			score: output.score
    		}));
    	}

    	function genRangedItems(items, valueType = 'max') {
    		let _items = cloneObj(items);

    		return _items.map(item => {
    			if (!isValidProp(item)) {
    				return item;
    			}

    			let valueRange = getProp(item.prop, customProps).range[position];

    			switch (valueType) {
    				case 'max':
    					item.value = valueRange[0];
    					break;
    				case 'min':
    					item.value = valueRange[1];
    					break;
    				case 'mid':
    					item.value = Math.round((valueRange[0] + valueRange[1]) / 2);
    					break;
    			}

    			return item;
    		});
    	}

    	function saveRangedItems(items, rangeType = 'max', suffix = '') {
    		let _items = genRangedItems(items, rangeType);
    		let _score = sumItems(_items).score;

    		historeUrls.add(JSON.stringify({
    			title: title + suffix,
    			position,
    			items: _items,
    			score: _score
    		}));
    	}

    	function saveMMM() {
    		if (!items.some(isValidProp)) {
    			return;
    		}

    		saveRangedItems(items, 'max', '[上]');
    		saveRangedItems(items, 'mid', '[中]');
    		saveRangedItems(items, 'min', '[下]');
    		setTimeout(asideScrollToBottom, 0);
    	}

    	function applyUrl(apply) {
    		let data = JSON.parse(apply.detail.url);
    		$$invalidate(0, position = data.position);
    		$$invalidate(2, title = data.title);
    		$$invalidate(1, items = data.items);
    	}

    	function refitValueRange() {
    		items.forEach(i => {
    			let _p = getProp(i.prop, customProps);
    			let [max, min] = _p.range[position];
    			i.value = clamp(i.value, min, max);
    		});
    	}

    	function reset() {
    		$$invalidate(2, title = '');
    		$$invalidate(1, items = cloneObj(new Array(4).fill(DefailtItem)));
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function input0_input_handler() {
    		title = this.value;
    		$$invalidate(2, title);
    	}

    	function input1_change_handler() {
    		position = this.__value;
    		$$invalidate(0, position);
    	}

    	function input2_change_handler() {
    		position = this.__value;
    		$$invalidate(0, position);
    	}

    	function input3_change_handler() {
    		position = this.__value;
    		$$invalidate(0, position);
    	}

    	function item_item_binding(value, item, each_value, index) {
    		each_value[index] = value;
    		$$invalidate(1, items);
    	}

    	$$self.$capture_state = () => ({
    		Item,
    		History,
    		Settings,
    		clamp,
    		sum,
    		getProp,
    		genProps,
    		cloneObj,
    		BreakPoints,
    		RockTypes,
    		DefailtItem,
    		historeUrls,
    		oriProps,
    		position,
    		items,
    		title,
    		updateScores,
    		sumItems,
    		save,
    		isValidProp,
    		genRangedItems,
    		saveRangedItems,
    		saveMMM,
    		asideScrollToBottom,
    		applyUrl,
    		refitValueRange,
    		reset,
    		submit,
    		customProps,
    		output,
    		$oriProps
    	});

    	$$self.$inject_state = $$props => {
    		if ('position' in $$props) $$invalidate(0, position = $$props.position);
    		if ('items' in $$props) $$invalidate(1, items = $$props.items);
    		if ('title' in $$props) $$invalidate(2, title = $$props.title);
    		if ('customProps' in $$props) customProps = $$props.customProps;
    		if ('output' in $$props) $$invalidate(3, output = $$props.output);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$oriProps*/ 256) {
    			customProps = genProps($oriProps);
    		}

    		if ($$self.$$.dirty & /*items, $oriProps*/ 258) {
    			$$invalidate(3, output = sumItems(items));
    		}

    		if ($$self.$$.dirty & /*position, items*/ 3) {
    			{
    				refitValueRange();
    			}
    		}
    	};

    	return [
    		position,
    		items,
    		title,
    		output,
    		save,
    		saveMMM,
    		applyUrl,
    		reset,
    		$oriProps,
    		input0_input_handler,
    		input1_change_handler,
    		$$binding_groups,
    		input2_change_handler,
    		input3_change_handler,
    		item_item_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
