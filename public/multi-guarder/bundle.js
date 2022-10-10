
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
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
    // unfortunately this can't be a constant as that wouldn't be tree-shakeable
    // so we cache the result instead
    let crossorigin;
    function is_crossorigin() {
        if (crossorigin === undefined) {
            crossorigin = false;
            try {
                if (typeof window !== 'undefined' && window.parent) {
                    void window.parent.document;
                }
            }
            catch (error) {
                crossorigin = true;
            }
        }
        return crossorigin;
    }
    function add_resize_listener(node, fn) {
        const computed_style = getComputedStyle(node);
        if (computed_style.position === 'static') {
            node.style.position = 'relative';
        }
        const iframe = element('iframe');
        iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
            'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.tabIndex = -1;
        const crossorigin = is_crossorigin();
        let unsubscribe;
        if (crossorigin) {
            iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
            unsubscribe = listen(window, 'message', (event) => {
                if (event.source === iframe.contentWindow)
                    fn();
            });
        }
        else {
            iframe.src = 'about:blank';
            iframe.onload = () => {
                unsubscribe = listen(iframe.contentWindow, 'resize', fn);
            };
        }
        append(node, iframe);
        return () => {
            if (crossorigin) {
                unsubscribe();
            }
            else if (unsubscribe && iframe.contentWindow) {
                unsubscribe();
            }
            detach(iframe);
        };
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
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
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

    /* src/multi-guarder/App.svelte generated by Svelte v3.43.0 */

    const { console: console_1 } = globals;
    const file = "src/multi-guarder/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	child_ctx[19] = list;
    	child_ctx[20] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[23] = list[i];
    	return child_ctx;
    }

    // (170:2) {#each attackers as a}
    function create_each_block_2(ctx) {
    	let div;
    	let div_data_title_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "dot--attacker svelte-it0tdi");
    			attr_dev(div, "data-title", div_data_title_value = /*a*/ ctx[23].title);
    			set_style(div, "--x", /*a*/ ctx[23].x);
    			set_style(div, "--y", /*a*/ ctx[23].y);
    			set_style(div, "--bgc", /*a*/ ctx[23].color);
    			add_location(div, file, 170, 3, 3125);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*attackers*/ 16 && div_data_title_value !== (div_data_title_value = /*a*/ ctx[23].title)) {
    				attr_dev(div, "data-title", div_data_title_value);
    			}

    			if (dirty & /*attackers*/ 16) {
    				set_style(div, "--x", /*a*/ ctx[23].x);
    			}

    			if (dirty & /*attackers*/ 16) {
    				set_style(div, "--y", /*a*/ ctx[23].y);
    			}

    			if (dirty & /*attackers*/ 16) {
    				set_style(div, "--bgc", /*a*/ ctx[23].color);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(170:2) {#each attackers as a}",
    		ctx
    	});

    	return block;
    }

    // (178:2) {#each defenders as d}
    function create_each_block_1(ctx) {
    	let div;
    	let div_data_range_value;
    	let div_data_title_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "dot svelte-it0tdi");
    			attr_dev(div, "data-range", div_data_range_value = /*d*/ ctx[18].range);
    			attr_dev(div, "data-title", div_data_title_value = /*d*/ ctx[18].title);
    			set_style(div, "--x", /*d*/ ctx[18].x);
    			set_style(div, "--y", /*d*/ ctx[18].y);
    			set_style(div, "--bgc", /*d*/ ctx[18].color);
    			add_location(div, file, 178, 3, 3279);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*defenders*/ 4 && div_data_range_value !== (div_data_range_value = /*d*/ ctx[18].range)) {
    				attr_dev(div, "data-range", div_data_range_value);
    			}

    			if (dirty & /*defenders*/ 4 && div_data_title_value !== (div_data_title_value = /*d*/ ctx[18].title)) {
    				attr_dev(div, "data-title", div_data_title_value);
    			}

    			if (dirty & /*defenders*/ 4) {
    				set_style(div, "--x", /*d*/ ctx[18].x);
    			}

    			if (dirty & /*defenders*/ 4) {
    				set_style(div, "--y", /*d*/ ctx[18].y);
    			}

    			if (dirty & /*defenders*/ 4) {
    				set_style(div, "--bgc", /*d*/ ctx[18].color);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(178:2) {#each defenders as d}",
    		ctx
    	});

    	return block;
    }

    // (224:3) {#each defenders as d}
    function create_each_block(ctx) {
    	let dt;
    	let t0_value = /*d*/ ctx[18].title + "";
    	let t0;
    	let t1;
    	let small;
    	let dd0;
    	let label0;
    	let t3;
    	let input0;
    	let input0_max_value;
    	let t4;
    	let dd1;
    	let label1;
    	let t5;
    	let input1;
    	let input1_max_value;
    	let t6;
    	let dd2;
    	let label2;
    	let t7;
    	let input2;
    	let t8;
    	let dd3;
    	let label3;
    	let t9;
    	let input3;
    	let t10;
    	let mounted;
    	let dispose;

    	function input0_input_handler() {
    		/*input0_input_handler*/ ctx[6].call(input0, /*each_value*/ ctx[19], /*d_index*/ ctx[20]);
    	}

    	function input1_input_handler() {
    		/*input1_input_handler*/ ctx[7].call(input1, /*each_value*/ ctx[19], /*d_index*/ ctx[20]);
    	}

    	function input2_input_handler() {
    		/*input2_input_handler*/ ctx[8].call(input2, /*each_value*/ ctx[19], /*d_index*/ ctx[20]);
    	}

    	function input3_input_handler() {
    		/*input3_input_handler*/ ctx[9].call(input3, /*each_value*/ ctx[19], /*d_index*/ ctx[20]);
    	}

    	const block = {
    		c: function create() {
    			dt = element("dt");
    			t0 = text(t0_value);
    			t1 = text(" - ");
    			small = element("small");
    			small.textContent = "護衛";
    			dd0 = element("dd");
    			label0 = element("label");
    			t3 = text("x:\n\t\t\t\t\t\t");
    			input0 = element("input");
    			t4 = space();
    			dd1 = element("dd");
    			label1 = element("label");
    			t5 = text("y:\n\t\t\t\t\t\t");
    			input1 = element("input");
    			t6 = space();
    			dd2 = element("dd");
    			label2 = element("label");
    			t7 = text("護衛範圍:\n\t\t\t\t\t\t");
    			input2 = element("input");
    			t8 = space();
    			dd3 = element("dd");
    			label3 = element("label");
    			t9 = text("顏色:\n\t\t\t\t\t\t");
    			input3 = element("input");
    			t10 = space();
    			add_location(small, file, 224, 20, 3898);
    			attr_dev(dt, "class", "svelte-it0tdi");
    			add_location(dt, file, 224, 4, 3882);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "max", input0_max_value = /*gridSize*/ ctx[0] - 1);
    			attr_dev(input0, "min", "0");
    			add_location(input0, file, 228, 6, 3958);
    			add_location(label0, file, 226, 5, 3935);
    			attr_dev(dd0, "class", "svelte-it0tdi");
    			add_location(dd0, file, 225, 4, 3925);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "max", input1_max_value = /*gridSize*/ ctx[0] - 1);
    			attr_dev(input1, "min", "0");
    			add_location(input1, file, 238, 6, 4114);
    			add_location(label1, file, 236, 5, 4091);
    			attr_dev(dd1, "class", "svelte-it0tdi");
    			add_location(dd1, file, 235, 4, 4081);
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "max", "3");
    			attr_dev(input2, "min", "0");
    			add_location(input2, file, 248, 6, 4273);
    			add_location(label2, file, 246, 5, 4247);
    			attr_dev(dd2, "class", "svelte-it0tdi");
    			add_location(dd2, file, 245, 4, 4237);
    			attr_dev(input3, "type", "color");
    			add_location(input3, file, 258, 6, 4423);
    			add_location(label3, file, 256, 5, 4399);
    			attr_dev(dd3, "class", "svelte-it0tdi");
    			add_location(dd3, file, 255, 4, 4389);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, dt, anchor);
    			append_dev(dt, t0);
    			append_dev(dt, t1);
    			append_dev(dt, small);
    			insert_dev(target, dd0, anchor);
    			append_dev(dd0, label0);
    			append_dev(label0, t3);
    			append_dev(label0, input0);
    			set_input_value(input0, /*d*/ ctx[18].x);
    			append_dev(dd0, t4);
    			insert_dev(target, dd1, anchor);
    			append_dev(dd1, label1);
    			append_dev(label1, t5);
    			append_dev(label1, input1);
    			set_input_value(input1, /*d*/ ctx[18].y);
    			append_dev(dd1, t6);
    			insert_dev(target, dd2, anchor);
    			append_dev(dd2, label2);
    			append_dev(label2, t7);
    			append_dev(label2, input2);
    			set_input_value(input2, /*d*/ ctx[18].range);
    			append_dev(dd2, t8);
    			insert_dev(target, dd3, anchor);
    			append_dev(dd3, label3);
    			append_dev(label3, t9);
    			append_dev(label3, input3);
    			set_input_value(input3, /*d*/ ctx[18].color);
    			append_dev(dd3, t10);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", input0_input_handler),
    					listen_dev(input1, "input", input1_input_handler),
    					listen_dev(input2, "input", input2_input_handler),
    					listen_dev(input3, "input", input3_input_handler)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*defenders*/ 4 && t0_value !== (t0_value = /*d*/ ctx[18].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*gridSize*/ 1 && input0_max_value !== (input0_max_value = /*gridSize*/ ctx[0] - 1)) {
    				attr_dev(input0, "max", input0_max_value);
    			}

    			if (dirty & /*defenders*/ 4 && to_number(input0.value) !== /*d*/ ctx[18].x) {
    				set_input_value(input0, /*d*/ ctx[18].x);
    			}

    			if (dirty & /*gridSize*/ 1 && input1_max_value !== (input1_max_value = /*gridSize*/ ctx[0] - 1)) {
    				attr_dev(input1, "max", input1_max_value);
    			}

    			if (dirty & /*defenders*/ 4 && to_number(input1.value) !== /*d*/ ctx[18].y) {
    				set_input_value(input1, /*d*/ ctx[18].y);
    			}

    			if (dirty & /*defenders*/ 4 && to_number(input2.value) !== /*d*/ ctx[18].range) {
    				set_input_value(input2, /*d*/ ctx[18].range);
    			}

    			if (dirty & /*defenders*/ 4) {
    				set_input_value(input3, /*d*/ ctx[18].color);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(dt);
    			if (detaching) detach_dev(dd0);
    			if (detaching) detach_dev(dd1);
    			if (detaching) detach_dev(dd2);
    			if (detaching) detach_dev(dd3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(224:3) {#each defenders as d}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let div4;
    	let h1;
    	let a0;
    	let t1;
    	let t2;
    	let div3;
    	let div1;
    	let div0;
    	let div0_data_title_value;
    	let t3;
    	let t4;
    	let div1_resize_listener;
    	let t5;
    	let div2;
    	let t6;
    	let br0;
    	let t7;
    	let br1;
    	let t8;
    	let br2;
    	let t9;
    	let details;
    	let summary;
    	let t11;
    	let pre;
    	let u0;
    	let t13;
    	let u1;
    	let t15;
    	let u2;
    	let t17;
    	let u3;
    	let t19;
    	let t20;
    	let hr0;
    	let t21;
    	let form;
    	let fieldset;
    	let legend;
    	let t23;
    	let dl;
    	let dt0;
    	let t24_value = /*attackee*/ ctx[1].title + "";
    	let t24;
    	let t25;
    	let small;
    	let dd0;
    	let label0;
    	let t27;
    	let input0;
    	let input0_max_value;
    	let t28;
    	let dd1;
    	let label1;
    	let t29;
    	let input1;
    	let input1_max_value;
    	let t30;
    	let dt1;
    	let dd2;
    	let input2;
    	let t32;
    	let footer;
    	let hr1;
    	let t33;
    	let a1;
    	let mounted;
    	let dispose;
    	let each_value_2 = /*attackers*/ ctx[4];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*defenders*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	let each_value = /*defenders*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			h1 = element("h1");
    			a0 = element("a");
    			a0.textContent = "../";
    			t1 = text("\n\t天地劫M 多重護衛優先級判定模擬");
    			t2 = space();
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			t3 = space();

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t4 = space();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t5 = space();
    			div2 = element("div");
    			t6 = text("圖中方格為攻擊者可站的位置");
    			br0 = element("br");
    			t7 = text("\n底色對應護衛單位\n");
    			br1 = element("br");
    			t8 = space();
    			br2 = element("br");
    			t9 = space();
    			details = element("details");
    			summary = element("summary");
    			summary.textContent = "== 護衛優先級 說明 ==";
    			t11 = space();
    			pre = element("pre");
    			u0 = element("u");
    			u0.textContent = "規則一：判定各護衛與「被攻擊者」距離";
    			t13 = text("\n離「被攻擊者」最近者，最優先護衛\n\n");
    			u1 = element("u");
    			u1.textContent = "規則二：判定各護衛與「攻擊者」距離";
    			t15 = text("\n若有複數最近的護衛群，改判定各護衛與「攻擊者」距離\n※ 坦X：上場順序最先者\n\n");
    			u2 = element("u");
    			u2.textContent = "狀況-1";
    			t17 = text("：坦X 距離攻擊者最近\n  則依正序護衛\n  (=> 坦X護衛)\n\n");
    			u3 = element("u");
    			u3.textContent = "狀況-2";
    			t19 = text("：坦X 距離攻擊者不是最近\n  比坦X更近的那堆中，依倒序護衛\n  (愈後上場者、護衛優先級愈高)");
    			t20 = space();
    			hr0 = element("hr");
    			t21 = space();
    			form = element("form");
    			fieldset = element("fieldset");
    			legend = element("legend");
    			legend.textContent = "自訂區塊";
    			t23 = space();
    			dl = element("dl");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			dt0 = element("dt");
    			t24 = text(t24_value);
    			t25 = text(" - ");
    			small = element("small");
    			small.textContent = "被攻擊目標";
    			dd0 = element("dd");
    			label0 = element("label");
    			t27 = text("x:\n\t\t\t\t\t");
    			input0 = element("input");
    			t28 = space();
    			dd1 = element("dd");
    			label1 = element("label");
    			t29 = text("y:\n\t\t\t\t\t");
    			input1 = element("input");
    			t30 = space();
    			dt1 = element("dt");
    			dt1.textContent = "格子數:\n\t\t\t";
    			dd2 = element("dd");
    			input2 = element("input");
    			t32 = space();
    			footer = element("footer");
    			hr1 = element("hr");
    			t33 = text("\n\t\t資料參考：\n\t\t");
    			a1 = element("a");
    			a1.textContent = "「天地劫」多T护卫机制 详解 @ bilibili by u/墨_源";
    			attr_dev(a0, "href", "../");
    			add_location(a0, file, 154, 1, 2800);
    			attr_dev(h1, "class", "svelte-it0tdi");
    			add_location(h1, file, 153, 0, 2794);
    			attr_dev(div0, "class", "dot attackee svelte-it0tdi");
    			attr_dev(div0, "data-title", div0_data_title_value = /*attackee*/ ctx[1].title);
    			set_style(div0, "--x", /*attackee*/ ctx[1].x);
    			set_style(div0, "--y", /*attackee*/ ctx[1].y);
    			add_location(div0, file, 163, 2, 2982);
    			attr_dev(div1, "class", "map svelte-it0tdi");
    			set_style(div1, "font-size", /*width*/ ctx[3] / /*gridSize*/ ctx[0] + "px");
    			set_style(div1, "height", /*width*/ ctx[3] + "px");
    			add_render_callback(() => /*div1_elementresize_handler*/ ctx[5].call(div1));
    			add_location(div1, file, 159, 1, 2870);
    			add_location(br0, file, 188, 13, 3462);
    			add_location(br1, file, 190, 0, 3476);
    			add_location(br2, file, 191, 0, 3481);
    			add_location(summary, file, 193, 1, 3502);
    			add_location(u0, file, 195, 0, 3543);
    			add_location(u1, file, 198, 0, 3587);
    			add_location(u2, file, 202, 0, 3652);
    			add_location(u3, file, 206, 0, 3697);
    			add_location(pre, file, 194, 0, 3537);
    			details.open = true;
    			add_location(details, file, 192, 0, 3486);
    			attr_dev(div2, "class", "intro");
    			add_location(div2, file, 187, 1, 3429);
    			attr_dev(hr0, "class", "svelte-it0tdi");
    			add_location(hr0, file, 215, 1, 3788);
    			attr_dev(div3, "class", "map-box svelte-it0tdi");
    			add_location(div3, file, 157, 0, 2846);
    			attr_dev(legend, "class", "svelte-it0tdi");
    			add_location(legend, file, 220, 2, 3822);
    			add_location(small, file, 265, 26, 4542);
    			attr_dev(dt0, "class", "svelte-it0tdi");
    			add_location(dt0, file, 265, 3, 4519);
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "max", input0_max_value = /*gridSize*/ ctx[0] - 1);
    			attr_dev(input0, "min", "0");
    			add_location(input0, file, 269, 5, 4601);
    			add_location(label0, file, 267, 4, 4580);
    			attr_dev(dd0, "class", "svelte-it0tdi");
    			add_location(dd0, file, 266, 3, 4571);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "max", input1_max_value = /*gridSize*/ ctx[0] - 1);
    			attr_dev(input1, "min", "0");
    			add_location(input1, file, 279, 5, 4754);
    			add_location(label1, file, 277, 4, 4733);
    			attr_dev(dd1, "class", "svelte-it0tdi");
    			add_location(dd1, file, 276, 3, 4724);
    			attr_dev(dt1, "class", "svelte-it0tdi");
    			add_location(dt1, file, 287, 3, 4878);
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "min", "4");
    			add_location(input2, file, 291, 4, 4913);
    			attr_dev(dd2, "class", "svelte-it0tdi");
    			add_location(dd2, file, 290, 3, 4904);
    			add_location(dl, file, 222, 2, 3847);
    			attr_dev(fieldset, "class", "svelte-it0tdi");
    			add_location(fieldset, file, 219, 1, 3809);
    			attr_dev(form, "class", "svelte-it0tdi");
    			add_location(form, file, 218, 0, 3801);
    			attr_dev(hr1, "class", "svelte-it0tdi");
    			add_location(hr1, file, 298, 2, 5029);
    			attr_dev(a1, "href", "https://www.bilibili.com/video/BV1VB4y1y7fh/");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "rel", "noreferrer noopener");
    			add_location(a1, file, 300, 2, 5044);
    			attr_dev(footer, "class", "info svelte-it0tdi");
    			add_location(footer, file, 297, 1, 5005);
    			attr_dev(div4, "class", "workspace svelte-it0tdi");
    			add_location(div4, file, 152, 0, 2770);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, h1);
    			append_dev(h1, a0);
    			append_dev(h1, t1);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			append_dev(div1, t3);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(div1, null);
    			}

    			append_dev(div1, t4);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div1, null);
    			}

    			div1_resize_listener = add_resize_listener(div1, /*div1_elementresize_handler*/ ctx[5].bind(div1));
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			append_dev(div2, t6);
    			append_dev(div2, br0);
    			append_dev(div2, t7);
    			append_dev(div2, br1);
    			append_dev(div2, t8);
    			append_dev(div2, br2);
    			append_dev(div2, t9);
    			append_dev(div2, details);
    			append_dev(details, summary);
    			append_dev(details, t11);
    			append_dev(details, pre);
    			append_dev(pre, u0);
    			append_dev(pre, t13);
    			append_dev(pre, u1);
    			append_dev(pre, t15);
    			append_dev(pre, u2);
    			append_dev(pre, t17);
    			append_dev(pre, u3);
    			append_dev(pre, t19);
    			append_dev(div3, t20);
    			append_dev(div3, hr0);
    			append_dev(div4, t21);
    			append_dev(div4, form);
    			append_dev(form, fieldset);
    			append_dev(fieldset, legend);
    			append_dev(fieldset, t23);
    			append_dev(fieldset, dl);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(dl, null);
    			}

    			append_dev(dl, dt0);
    			append_dev(dt0, t24);
    			append_dev(dt0, t25);
    			append_dev(dt0, small);
    			append_dev(dl, dd0);
    			append_dev(dd0, label0);
    			append_dev(label0, t27);
    			append_dev(label0, input0);
    			set_input_value(input0, /*attackee*/ ctx[1].x);
    			append_dev(dd0, t28);
    			append_dev(dl, dd1);
    			append_dev(dd1, label1);
    			append_dev(label1, t29);
    			append_dev(label1, input1);
    			set_input_value(input1, /*attackee*/ ctx[1].y);
    			append_dev(dd1, t30);
    			append_dev(dl, dt1);
    			append_dev(dl, dd2);
    			append_dev(dd2, input2);
    			set_input_value(input2, /*gridSize*/ ctx[0]);
    			append_dev(div4, t32);
    			append_dev(div4, footer);
    			append_dev(footer, hr1);
    			append_dev(footer, t33);
    			append_dev(footer, a1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler_1*/ ctx[10]),
    					listen_dev(input1, "input", /*input1_input_handler_1*/ ctx[11]),
    					listen_dev(input2, "input", /*input2_input_handler_1*/ ctx[12])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*attackee*/ 2 && div0_data_title_value !== (div0_data_title_value = /*attackee*/ ctx[1].title)) {
    				attr_dev(div0, "data-title", div0_data_title_value);
    			}

    			if (dirty & /*attackee*/ 2) {
    				set_style(div0, "--x", /*attackee*/ ctx[1].x);
    			}

    			if (dirty & /*attackee*/ 2) {
    				set_style(div0, "--y", /*attackee*/ ctx[1].y);
    			}

    			if (dirty & /*attackers*/ 16) {
    				each_value_2 = /*attackers*/ ctx[4];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(div1, t4);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (dirty & /*defenders*/ 4) {
    				each_value_1 = /*defenders*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*width, gridSize*/ 9) {
    				set_style(div1, "font-size", /*width*/ ctx[3] / /*gridSize*/ ctx[0] + "px");
    			}

    			if (dirty & /*width*/ 8) {
    				set_style(div1, "height", /*width*/ ctx[3] + "px");
    			}

    			if (dirty & /*defenders, gridSize*/ 5) {
    				each_value = /*defenders*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(dl, dt0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*attackee*/ 2 && t24_value !== (t24_value = /*attackee*/ ctx[1].title + "")) set_data_dev(t24, t24_value);

    			if (dirty & /*gridSize*/ 1 && input0_max_value !== (input0_max_value = /*gridSize*/ ctx[0] - 1)) {
    				attr_dev(input0, "max", input0_max_value);
    			}

    			if (dirty & /*attackee*/ 2 && to_number(input0.value) !== /*attackee*/ ctx[1].x) {
    				set_input_value(input0, /*attackee*/ ctx[1].x);
    			}

    			if (dirty & /*gridSize*/ 1 && input1_max_value !== (input1_max_value = /*gridSize*/ ctx[0] - 1)) {
    				attr_dev(input1, "max", input1_max_value);
    			}

    			if (dirty & /*attackee*/ 2 && to_number(input1.value) !== /*attackee*/ ctx[1].y) {
    				set_input_value(input1, /*attackee*/ ctx[1].y);
    			}

    			if (dirty & /*gridSize*/ 1 && to_number(input2.value) !== /*gridSize*/ ctx[0]) {
    				set_input_value(input2, /*gridSize*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			div1_resize_listener();
    			destroy_each(each_blocks, detaching);
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

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let width;
    	let gridSize = 6;

    	let attacker = {
    		index: 20,
    		order: 20,
    		title: '攻',
    		position: [1, 0]
    	};

    	let attackee = {
    		index: 10,
    		order: 10,
    		title: '受',
    		x: 1,
    		y: 2
    	};

    	let defenders = [
    		{
    			index: 1,
    			order: 1,
    			title: '坦1',
    			x: 0,
    			y: 3,
    			range: 2,
    			color: '#ff9999'
    		},
    		{
    			index: 2,
    			order: 2,
    			title: '坦2',
    			x: 2,
    			y: 3,
    			range: 3,
    			color: '#99ff99'
    		},
    		{
    			index: 3,
    			order: 3,
    			title: '坦3',
    			x: 3,
    			y: 2,
    			range: 2,
    			color: '#9999ff'
    		}
    	];

    	
    	let attackers = [];
    	let empty = { title: '' };

    	function updateDefenders(attacker) {
    		let _attackers = [];
    		let _nearest_defenders = findNearestDefendersToAttackee();

    		for (let i = gridSize - 1; i >= 0; i--) {
    			for (let j = gridSize - 1; j >= 0; j--) {
    				let def = findDefender(i, j, _nearest_defenders);
    				console.log({ def });

    				_attackers[i + j * gridSize] = {
    					title: `${def.title}`,
    					x: i,
    					y: j,
    					color: def.color
    				}; // role: 'attacker',
    			}
    		}

    		$$invalidate(4, attackers = _attackers);
    	}

    	function findNearestDefendersToAttackee() {
    		let _d = [];
    		let minest = gridSize * 2;

    		defenders.forEach(d => {
    			if (d.range < d.distance) {
    				return null;
    			}

    			if (minest >= d.distance) {
    				minest = d.distance;

    				if (!_d[d.distance]) {
    					_d[d.distance] = [];
    				}

    				_d[d.distance].push(d);
    			}
    		});

    		return _d[minest];
    	}

    	function findDefender(x, y, _defenders) {
    		if (!_defenders || _defenders.length === 0) {
    			return empty;
    		}

    		if (_defenders.length === 1) {
    			return _defenders[0];
    		}

    		// 2. find distance to attacker
    		let minDistance = gridSize * 2;

    		let minIndex = 999;
    		let maxIndex = 0;

    		let _d = _defenders.map(d => {
    			let distance = Math.abs(d.y - y) + Math.abs(d.x - x);
    			let { index, title, color } = d;

    			if (minDistance > distance) {
    				minDistance = distance;
    			}

    			if (minIndex > index) {
    				minIndex = index;
    			}

    			if (maxIndex < index) {
    				maxIndex = index;
    			}

    			return { index, title, distance, color };
    		});

    		let minIndexDefender = _d.find(d => d.index === minIndex);
    		_d.find(d => d.index === maxIndex);

    		// if smallest index defender is one of the closest defenders,
    		// just select it.
    		if (minIndexDefender.distance === minDistance) {
    			return minIndexDefender;
    		} else {
    			// find the biggest index defender in the closer group than smallest index defender
    			return _d.filter(d => d.distance < minIndexDefender.distance).sort((a, b) => b.index - a.index)[0];
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function div1_elementresize_handler() {
    		width = this.clientWidth;
    		$$invalidate(3, width);
    	}

    	function input0_input_handler(each_value, d_index) {
    		each_value[d_index].x = to_number(this.value);
    		$$invalidate(2, defenders);
    	}

    	function input1_input_handler(each_value, d_index) {
    		each_value[d_index].y = to_number(this.value);
    		$$invalidate(2, defenders);
    	}

    	function input2_input_handler(each_value, d_index) {
    		each_value[d_index].range = to_number(this.value);
    		$$invalidate(2, defenders);
    	}

    	function input3_input_handler(each_value, d_index) {
    		each_value[d_index].color = this.value;
    		$$invalidate(2, defenders);
    	}

    	function input0_input_handler_1() {
    		attackee.x = to_number(this.value);
    		$$invalidate(1, attackee);
    	}

    	function input1_input_handler_1() {
    		attackee.y = to_number(this.value);
    		$$invalidate(1, attackee);
    	}

    	function input2_input_handler_1() {
    		gridSize = to_number(this.value);
    		$$invalidate(0, gridSize);
    	}

    	$$self.$capture_state = () => ({
    		width,
    		gridSize,
    		attacker,
    		attackee,
    		defenders,
    		attackers,
    		empty,
    		updateDefenders,
    		findNearestDefendersToAttackee,
    		findDefender
    	});

    	$$self.$inject_state = $$props => {
    		if ('width' in $$props) $$invalidate(3, width = $$props.width);
    		if ('gridSize' in $$props) $$invalidate(0, gridSize = $$props.gridSize);
    		if ('attacker' in $$props) attacker = $$props.attacker;
    		if ('attackee' in $$props) $$invalidate(1, attackee = $$props.attackee);
    		if ('defenders' in $$props) $$invalidate(2, defenders = $$props.defenders);
    		if ('attackers' in $$props) $$invalidate(4, attackers = $$props.attackers);
    		if ('empty' in $$props) empty = $$props.empty;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*attackee, defenders*/ 6) {
    			{

    				defenders.forEach(d => {
    					d.distance = Math.abs(d.y - attackee.y) + Math.abs(d.x - attackee.x);
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*defenders, attackee, gridSize*/ 7) {
    			{
    				updateDefenders();
    			}
    		}
    	};

    	return [
    		gridSize,
    		attackee,
    		defenders,
    		width,
    		attackers,
    		div1_elementresize_handler,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input0_input_handler_1,
    		input1_input_handler_1,
    		input2_input_handler_1
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
