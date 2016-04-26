(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

var Webflow = require('./webflow-lib');
window.Webflow = Webflow;
var define = Webflow.define;

/**
 * Webflow: Front-end modules
 */
define('ix'       , require('./webflow-ix'));
define('touch'    , require('./webflow-touch'));
define('forms'    , require('./webflow-forms'));
define('maps'     , require('./webflow-maps'));
define('gplus'    , require('./webflow-gplus'));
define('scroll'   , require('./webflow-scroll'));
define('links'    , require('./webflow-links'));
define('slider'   , require('./webflow-slider'));
define('lightbox' , require('./webflow-lightbox'));
define('navbar'   , require('./webflow-navbar'));
define('dropdown' , require('./webflow-dropdown'));
define('tabs'     , require('./webflow-tabs'));
define('brand'    , require('./webflow-brand'));



},{"./webflow-brand":2,"./webflow-dropdown":3,"./webflow-forms":4,"./webflow-gplus":5,"./webflow-ix":6,"./webflow-lib":7,"./webflow-lightbox":8,"./webflow-links":9,"./webflow-maps":10,"./webflow-navbar":11,"./webflow-scroll":12,"./webflow-slider":13,"./webflow-tabs":14,"./webflow-touch":15}],2:[function(require,module,exports){
'use strict';

/**
 * Webflow: Brand pages on the subdomain
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var api = {};
  var $html = $('html');
  var $body = $('body');
  var location = window.location;
  var inApp = Webflow.env();

  // -----------------------------------
  // Module methods

  api.ready = function() {
    var doBranding = $html.attr("data-wf-status");

    if (doBranding) {
      var $branding = $('<div></div>');
      var $link = $('<a></a>');
      $link.attr('href', 'http://webflow.com?utm_campaign=brandjs');

      $branding.css({
        position: 'fixed',
        bottom: 0,
        right: 0,
        borderTop: '5px solid #2b3239',
        borderLeft: '5px solid #2b3239',
        borderTopLeftRadius: '5px',
        backgroundColor: '#2b3239',
        padding: '5px 5px 5px 10px',
        fontFamily: 'Arial',
        fontSize: '10px',
        textTransform: 'uppercase',
        opacity: '0',
        transition: 'opacity 0.50s ease-in-out'
      });

      $link.css({
        color: '#AAADB0',
        textDecoration: 'none'
      });

      var $webflowLogo = $('<img>');
      $webflowLogo.attr('src', 'https://daks2k3a4ib2z.cloudfront.net/54153e6a3d25f2755b1f14ed/5445a4b1944ecdaa4df86d3e_subdomain-brand.svg');
      $webflowLogo.css({
        opacity: 0.9,
        width: '55px',
        verticalAlign: 'middle',
        paddingLeft: '4px',
        paddingBottom: '3px'
      });

      $branding.text('Built with');
      $branding.append($webflowLogo);
      $link.append($branding);

      $body.append($link);

      if (/PhantomJS/.test(window.navigator.userAgent)) {
        return;
      }

      $branding.css({
        opacity: '1.0'
      });
    }
  };

  // Export module
  return api;
};

},{"./webflow-lib":7}],3:[function(require,module,exports){
'use strict';

/**
 * Webflow: Dropdown component
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var api = {};
  var tram = $.tram;
  var $doc = $(document);
  var $dropdowns;
  var designer;
  var inApp = Webflow.env();
  var namespace = '.w-dropdown';
  var stateOpen = 'w--open';
  var closeEvent = 'w-close' + namespace;
  var ix = Webflow.ixEvents();

  // -----------------------------------
  // Module methods

  api.ready = api.design = api.preview = init;

  // -----------------------------------
  // Private methods

  function init() {
    designer = inApp && Webflow.env('design');

    // Find all instances on the page
    $dropdowns = $doc.find(namespace);
    $dropdowns.each(build);
  }

  function build(i, el) {
    var $el = $(el);

    // Store state in data
    var data = $.data(el, namespace);
    if (!data) data = $.data(el, namespace, { open: false, el: $el, config: {} });
    data.list = $el.children('.w-dropdown-list');
    data.toggle = $el.children('.w-dropdown-toggle');
    data.links = data.list.children('.w-dropdown-link');
    data.outside = outside(data);
    data.complete = complete(data);

    // Remove old events
    $el.off(namespace);
    data.toggle.off(namespace);

    // Set config from data attributes
    configure(data);

    if (data.nav) data.nav.off(namespace);
    data.nav = $el.closest('.w-nav');
    data.nav.on(closeEvent, handler(data));

    // Add events based on mode
    if (designer) {
      $el.on('setting' + namespace, handler(data));
    } else {
      data.toggle.on('tap' + namespace, toggle(data));
      $el.on(closeEvent, handler(data));
      // Close in preview mode
      inApp && close(data);
    }
  }

  function configure(data) {
    data.config = {
      hover: +data.el.attr('data-hover'),
      delay: +data.el.attr('data-delay') || 0
    };
  }

  function handler(data) {
    return function(evt, options) {
      options = options || {};

      if (evt.type == 'w-close') {
        return close(data);
      }

      if (evt.type == 'setting') {
        configure(data);
        options.open === true && open(data, true);
        options.open === false && close(data, true);
        return;
      }
    };
  }

  function toggle(data) {
    return _.debounce(function(evt) {
      data.open ? close(data) : open(data);
    });
  }

  function open(data, immediate) {
    if (data.open) return;
    closeOthers(data);
    data.open = true;
    data.list.addClass(stateOpen);
    data.toggle.addClass(stateOpen);
    ix.intro(0, data.el[0]);
    Webflow.redraw.up();

    // Listen for tap outside events
    if (!designer) $doc.on('tap' + namespace, data.outside);

    // Clear previous delay
    window.clearTimeout(data.delayId);
  }

  function close(data, immediate) {
    if (!data.open) return;
    data.open = false;
    var config = data.config;
    ix.outro(0, data.el[0]);

    // Stop listening for tap outside events
    $doc.off('tap' + namespace, data.outside);

    // Clear previous delay
    window.clearTimeout(data.delayId);

    // Skip delay during immediate
    if (!config.delay || immediate) return data.complete();

    // Optionally wait for delay before close
    data.delayId = window.setTimeout(data.complete, config.delay);
  }

  function closeOthers(data) {
    var self = data.el[0];
    $dropdowns.each(function(i, other) {
      var $other = $(other);
      if ($other.is(self) || $other.has(self).length) return;
      $other.triggerHandler(closeEvent);
    });
  }

  function outside(data) {
    // Unbind previous tap handler if it exists
    if (data.outside) $doc.off('tap' + namespace, data.outside);

    // Close menu when tapped outside
    return _.debounce(function(evt) {
      if (!data.open) return;
      var $target = $(evt.target);
      if ($target.closest('.w-dropdown-toggle').length) return;
      if (!data.el.is($target.closest(namespace))) {
        close(data);
      }
    });
  }

  function complete(data) {
    return function() {
      data.list.removeClass(stateOpen);
      data.toggle.removeClass(stateOpen);
    };
  }

  // Export module
  return api;
};

},{"./webflow-lib":7}],4:[function(require,module,exports){
'use strict';

/**
 * Webflow: Forms
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var api = {};

  // Cross-Domain AJAX for IE8
  require('../plugins/xdomain-min');

  var FORM_API_HOST = 'https://webflow.com';
  var FORM_SUBMIT_HOST = 'https://webflow.com';
  var FORM_OLDIE_HOST = 'http://formdata.webflow.com';

  var $doc = $(document);
  var $forms;
  var loc = window.location;
  var retro = window.XDomainRequest && !window.atob;
  var namespace = '.w-form';
  var siteId;
  var emailField = /e(\-)?mail/i;
  var emailValue = /^\S+@\S+$/;
  var alert = window.alert;
  var listening;

  // MailChimp domains: list-manage.com + mirrors
  var chimpRegex = /list-manage[1-9]?.com/i;

  api.ready = function() {
    // Init forms
    init();

    // Wire document events once
    if (!listening) addListeners();
  };

  api.preview = api.design = function() {
    init();
  };

  function init() {
    siteId = $('html').attr('data-wf-site');

    $forms = $(namespace + ' form');
    if (!$forms.length) return;
    $forms.each(build);
  }

  function build(i, el) {
    // Store form state using namespace
    var $el = $(el);
    var data = $.data(el, namespace);
    if (!data) data = $.data(el, namespace, { form: $el }); // data.form

    reset(data);
    var wrap = $el.closest('div.w-form');
    data.done = wrap.find('> .w-form-done');
    data.fail = wrap.find('> .w-form-fail');

    var action = data.action = $el.attr('action');
    data.handler = null;
    data.redirect = $el.attr('data-redirect');

    // MailChimp form
    if (chimpRegex.test(action)) { data.handler = submitMailChimp; return; }

    // Custom form action
    if (action) return;

    // Webflow form
    if (siteId) { data.handler = submitWebflow; return; }

    // Alert for disconnected Webflow forms
    disconnected();
  }

  function addListeners() {
    listening = true;

    // Handle form submission for Webflow forms
    $doc.on('submit', namespace + ' form', function(evt) {
      var data = $.data(this, namespace);
      if (data.handler) {
        data.evt = evt;
        data.handler(data);
      }
    });
  }

  // Reset data common to all submit handlers
  function reset(data) {
    var btn = data.btn = data.form.find(':input[type="submit"]');
    data.wait = data.btn.attr('data-wait') || null;
    data.success = false;
    btn.prop('disabled', false);
    data.label && btn.val(data.label);
  }

  // Disable submit button
  function disableBtn(data) {
    var btn = data.btn;
    var wait = data.wait;
    btn.prop('disabled', true);
    // Show wait text and store previous label
    if (wait) {
      data.label = btn.val();
      btn.val(wait);
    }
  }

  // Find form fields, validate, and set value pairs
  function findFields(form, result) {
    var status = null;
    result = result || {};

    // The ":input" selector is a jQuery shortcut to select all inputs, selects, textareas
    form.find(':input:not([type="submit"])').each(function(i, el) {
      var field = $(el);
      var type = field.attr('type');
      var name = field.attr('data-name') || field.attr('name') || ('Field ' + (i + 1));
      var value = field.val();

      if (type == 'checkbox') {
        value = field.is(':checked');
      } if (type == 'radio') {
        // Radio group value already processed
        if (result[name] === null || typeof result[name] == 'string') {
          return;
        }

        value = form.find('input[name="' + field.attr('name') + '"]:checked').val() || null;
      }

      if (typeof value == 'string') value = $.trim(value);
      result[name] = value;
      status = status || getStatus(field, name, value);
    });

    return status;
  }

  function getStatus(field, name, value) {
    var status = null;
    if (!field.attr('required')) return null;
    if (!value) status = 'Please fill out the required field: ' + name;
    else if (emailField.test(name) || emailField.test(field.attr('type'))) {
      if (!emailValue.test(value)) status = 'Please enter a valid email address for: ' + name;
    }
    return status;
  }

  // Submit form to Webflow
  function submitWebflow(data) {
    reset(data);

    var form = data.form;
    var payload = {
      name: form.attr('data-name') || form.attr('name') || 'Untitled Form',
      source: loc.href,
      test: Webflow.env(),
      fields: {}
    };

    preventDefault(data);

    // Find & populate all fields
    var status = findFields(form, payload.fields);
    if (status) return alert(status);

    // Disable submit button
    disableBtn(data);

    // Read site ID
    // NOTE: If this site is exported, the HTML tag must retain the data-wf-site attribute for forms to work
    if (!siteId) { afterSubmit(data); return; }
    var url = FORM_API_HOST + '/api/v1/form/' + siteId;

    // Work around same-protocol IE XDR limitation - without this IE9 and below forms won't submit
    if (retro && url.indexOf(FORM_SUBMIT_HOST) >= 0) {
      url = url.replace(FORM_SUBMIT_HOST, FORM_OLDIE_HOST);
    }

    $.ajax({
      url: url,
      type: 'POST',
      data: payload,
      dataType: 'json',
      crossDomain: true
    }).done(function() {
      data.success = true;
      afterSubmit(data);
    }).fail(function() {
      afterSubmit(data);
    });
  }

  // Submit form to MailChimp
  function submitMailChimp(data) {
    reset(data);

    var form = data.form;
    var payload = {};

    // Skip Ajax submission if http/s mismatch, fallback to POST instead
    if (/^https/.test(loc.href) && !/^https/.test(data.action)) {
      form.attr('method', 'post');
      return;
    }

    preventDefault(data);

    // Find & populate all fields
    var status = findFields(form, payload);
    if (status) return alert(status);

    // Disable submit button
    disableBtn(data);

    // Use special format for MailChimp params
    var fullName;
    _.each(payload, function(value, key) {
      if (emailField.test(key)) payload.EMAIL = value;
      if (/^((full[ _-]?)?name)$/i.test(key)) fullName = value;
      if (/^(first[ _-]?name)$/i.test(key)) payload.FNAME = value;
      if (/^(last[ _-]?name)$/i.test(key)) payload.LNAME = value;
    });

    if (fullName && !payload.FNAME) {
      fullName = fullName.split(' ');
      payload.FNAME = fullName[0];
      payload.LNAME = payload.LNAME || fullName[1];
    }

    // Use the (undocumented) MailChimp jsonp api
    var url = data.action.replace('/post?', '/post-json?') + '&c=?';
    // Add special param to prevent bot signups
    var userId = url.indexOf('u=')+2;
    userId = url.substring(userId, url.indexOf('&', userId));
    var listId = url.indexOf('id=')+3;
    listId = url.substring(listId, url.indexOf('&', listId));
    payload['b_' + userId + '_' + listId] = '';

    $.ajax({
      url: url,
      data: payload,
      dataType: 'jsonp'
    }).done(function(resp) {
      data.success = (resp.result == 'success' || /already/.test(resp.msg));
      if (!data.success) console.info('MailChimp error: ' + resp.msg);
      afterSubmit(data);
    }).fail(function() {
      afterSubmit(data);
    });
  }

  // Common callback which runs after all Ajax submissions
  function afterSubmit(data) {
    var form = data.form;
    var wrap = form.closest('div.w-form');
    var redirect = data.redirect;
    var success = data.success;

    // Redirect to a success url if defined
    if (success && redirect) {
      Webflow.location(redirect);
      return;
    }

    // Show or hide status divs
    data.done.toggle(success);
    data.fail.toggle(!success);

    // Hide form on success
    form.toggle(!success);

    // Reset data and enable submit button
    reset(data);
  }

  function preventDefault(data) {
    data.evt && data.evt.preventDefault();
    data.evt = null;
  }

  var disconnected = _.debounce(function() {
    alert('Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.');
  }, 100);

  // Export module
  return api;
};

},{"../plugins/xdomain-min":18,"./webflow-lib":7}],5:[function(require,module,exports){
'use strict';

/**
 * Webflow: Google+ widget
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var $doc = $(document);
  var api = {};
  var loaded;

  api.ready = function() {
    // Load Google+ API on the front-end
    if (!Webflow.env() && !loaded) init();
  };

  function init() {
    $doc.find('.w-widget-gplus').length && load();
  }

  function load() {
    loaded = true;
    $.getScript('https://apis.google.com/js/plusone.js');
  }

  // Export module
  return api;
};

},{"./webflow-lib":7}],6:[function(require,module,exports){
'use strict';

/**
 * Webflow: Interactions
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var api = {};
  var designer;
  var $win = $(window);
  var namespace = '.w-ix';
  var tram = $.tram;
  var env = Webflow.env;
  var inApp = env();
  var emptyFix = env.chrome && env.chrome < 35;
  var transNone = 'none 0s ease 0s';
  var introEvent = 'w-ix-intro' + namespace;
  var outroEvent = 'w-ix-outro' + namespace;
  var fallbackProps = /width|height/;
  var eventQueue = [];
  var $subs = $();
  var config = {};
  var anchors = [];
  var loads = [];
  var readys = [];
  var destroyed;

  // Component types and proxy selectors
  var components = {
    tabs: '.w-tab-link, .w-tab-pane',
    dropdown: '.w-dropdown',
    slider: '.w-slide',
    navbar: '.w-nav'
  };

  // -----------------------------------
  // Module methods

  api.init = function(list) {
    setTimeout(function() { configure(list); }, 1);
  };

  api.preview = function() {
    designer = false;
    setTimeout(function() { configure(window.__wf_ix); }, 1);
  };

  api.design = function() {
    designer = true;
    api.destroy();
  };

  api.destroy = function() {
    destroyed = true;
    $subs.each(teardown);
    Webflow.scroll.off(scroll);
    asyncEvents();
    anchors = [];
    loads = [];
    readys = [];
  };

  api.ready = function() {
    // Ready should only be used after destroy, as a way to re-init
    if (config && destroyed) {
      destroyed = false;
      init();
    }
  };

  api.run = run;
  api.events = {};
  api.style = inApp ? styleApp : stylePub;

  // -----------------------------------
  // Private methods

  function configure(list) {
    if (!list) return;

    // Map all interactions by slug
    config = {};
    _.each(list, function(item) {
      config[item.slug] = item.value;
    });

    // Init ix after config
    init();
  }

  function init() {
    // Build each element's interaction keying from data attribute
    var els = $('[data-ix]');
    if (!els.length) return;
    els.each(teardown);
    els.each(build);

    // Listen for scroll events if any anchors exist
    if (anchors.length) {
      Webflow.scroll.on(scroll);
      setTimeout(scroll, 1);
    }

    // Handle loads or readys if they exist
    if (loads.length) Webflow.load(runLoads);
    if (readys.length) setTimeout(runReadys, 1);

    // Trigger queued events, must happen after init
    initEvents();
  }

  function build(i, el) {
    var $el = $(el);
    var id = $el.attr('data-ix');
    var ix = config[id];
    if (!ix) return;
    var triggers = ix.triggers;
    if (!triggers) return;

    // Set styles immediately to provide tram with starting transform values
    api.style($el, ix.style);

    _.each(triggers, function(trigger) {
      var state = {};
      var type = trigger.type;
      var stepsB = trigger.stepsB && trigger.stepsB.length;

      function runA() { run(trigger, $el, { group: 'A' }); }
      function runB() { run(trigger, $el, { group: 'B' }); }

      if (type == 'load') {
        (trigger.preload && !inApp) ? loads.push(runA) : readys.push(runA);
        return;
      }

      if (type == 'click') {
        $el.on('click' + namespace, function(evt) {
          // Avoid late clicks on touch devices
          if (!Webflow.validClick(evt.currentTarget)) return;

          // Prevent default on empty hash urls
          if ($el.attr('href') === '#') evt.preventDefault();

          run(trigger, $el, { group: state.clicked ? 'B' : 'A' });
          if (stepsB) state.clicked = !state.clicked;
        });
        $subs = $subs.add($el);
        return;
      }

      if (type == 'hover') {
        $el.on('mouseenter' + namespace, runA);
        $el.on('mouseleave' + namespace, runB);
        $subs = $subs.add($el);
        return;
      }

      if (type == 'scroll') {
        anchors.push({
          el: $el, trigger: trigger, state: { active: false },
          offsetTop: convert(trigger.offsetTop),
          offsetBot: convert(trigger.offsetBot)
        });
        return;
      }

      // Check for a proxy component selector
      // type == [tabs, dropdown, slider, navbar]
      var proxy = components[type];
      if (proxy) {
        var $proxy = $el.closest(proxy);
        $proxy.on(introEvent, runA).on(outroEvent, runB);
        $subs = $subs.add($proxy);
        return;
      }
    });
  }

  function convert(offset) {
    if (!offset) return 0;
    offset = offset + '';
    var result = parseInt(offset, 10);
    if (result !== result) return 0;
    if (offset.indexOf('%') > 0) {
      result = result / 100;
      if (result >= 1) result = 0.999;
    }
    return result;
  }

  function teardown(i, el) {
    $(el).off(namespace);
  }

  function scroll() {
    var viewTop = $win.scrollTop();
    var viewHeight = $win.height();

    // Check each anchor for a valid scroll trigger
    var count = anchors.length;
    for (var i = 0; i < count; i++) {
      var anchor = anchors[i];
      var $el = anchor.el;
      var trigger = anchor.trigger;
      var stepsB = trigger.stepsB && trigger.stepsB.length;
      var state = anchor.state;
      var top = $el.offset().top;
      var height = $el.outerHeight();
      var offsetTop = anchor.offsetTop;
      var offsetBot = anchor.offsetBot;
      if (offsetTop < 1 && offsetTop > 0) offsetTop *= viewHeight;
      if (offsetBot < 1 && offsetBot > 0) offsetBot *= viewHeight;
      var active = (top + height - offsetTop >= viewTop && top + offsetBot <= viewTop + viewHeight);
      if (active === state.active) continue;
      if (active === false && !stepsB) continue;
      state.active = active;
      run(trigger, $el, { group: active ? 'A' : 'B' });
    }
  }

  function runLoads() {
    var count = loads.length;
    for (var i = 0; i < count; i++) {
      loads[i]();
    }
  }

  function runReadys() {
    var count = readys.length;
    for (var i = 0; i < count; i++) {
      readys[i]();
    }
  }

  function run(trigger, $el, opts, replay) {
    opts = opts || {};
    var done = opts.done;

    // Do not run in designer unless forced
    if (designer && !opts.force) return;

    // Operate on a set of grouped steps
    var group = opts.group || 'A';
    var loop = trigger['loop' + group];
    var steps = trigger['steps' + group];
    if (!steps || !steps.length) return;
    if (steps.length < 2) loop = false;

    // One-time init before any loops
    if (!replay) {

      // Find selector within element descendants, siblings, or query whole document
      var selector = trigger.selector;
      if (selector) {
        $el = (
          trigger.descend ? $el.find(selector) :
          trigger.siblings ? $el.siblings(selector) :
          $(selector)
        );
        if (inApp) $el.attr('data-ix-affect', 1);
      }

      // Apply empty fix for certain Chrome versions
      if (emptyFix) $el.addClass('w-ix-emptyfix');
    }

    var _tram = tram($el);

    // Add steps
    var meta = {};
    for (var i = 0; i < steps.length; i++) {
      addStep(_tram, steps[i], meta);
    }

    function fin() {
      // Run trigger again if looped
      if (loop) return run(trigger, $el, opts, true);

      // Reset any 'auto' values
      if (meta.width == 'auto') _tram.set({ width: 'auto' });
      if (meta.height == 'auto') _tram.set({ height: 'auto' });

      // Run callback
      done && done();
    }

    // Add final step to queue if tram has started
    meta.start ? _tram.then(fin) : fin();
  }

  function addStep(_tram, step, meta) {
    var addMethod = 'add';
    var startMethod = 'start';

    // Once the transition has started, we will always use then() to add to the queue.
    if (meta.start) addMethod = startMethod = 'then';

    // Parse transitions string on the current step
    var transitions = step.transition;
    if (transitions) {
      transitions = transitions.split(',');
      for (var i = 0; i < transitions.length; i++) {
        var transition = transitions[i];
        var options = fallbackProps.test(transition) ? { fallback: true } : null;
        _tram[addMethod](transition, options);
      }
    }

    // Build a clean object to pass to the tram method
    var clean = tramify(step) || {};

    // Store last width and height values
    if (clean.width != null) meta.width = clean.width;
    if (clean.height != null) meta.height = clean.height;

    // When transitions are not present, set values immediately and continue queue.
    if (transitions == null) {

      // If we have started, wrap set() in then() and reset queue
      if (meta.start) {
        _tram.then(function() {
          var queue = this.queue;
          this.set(clean);
          if (clean.display) {
            _tram.redraw();
            Webflow.redraw.up();
          }
          this.queue = queue;
          this.next();
        });
      } else {
        _tram.set(clean);

        // Always redraw after setting display
        if (clean.display) {
          _tram.redraw();
          Webflow.redraw.up();
        }
      }

      // Use the wait() method to kick off queue in absence of transitions.
      var wait = clean.wait;
      if (wait != null) {
        _tram.wait(wait);
        meta.start = true;
      }

    // Otherwise, when transitions are present
    } else {

      // If display is present, handle it separately
      if (clean.display) {
        var display = clean.display;
        delete clean.display;

        // If we've already started, we need to wrap it in a then()
        if (meta.start) {
          _tram.then(function() {
            var queue = this.queue;
            this.set({ display: display }).redraw();
            Webflow.redraw.up();
            this.queue = queue;
            this.next();
          });
        } else {
          _tram.set({ display: display }).redraw();
          Webflow.redraw.up();
        }
      }

      // Otherwise, start a transition using the current start method.
      _tram[startMethod](clean);
      meta.start = true;
    }
  }

  // (In app) Set styles immediately and manage upstream transition
  function styleApp(el, data) {
    var _tram = tram(el);

    // Get computed transition value
    el.css('transition', '');
    var computed = el.css('transition');

    // If computed is set to none, clear upstream
    if (computed === transNone) computed = _tram.upstream = null;

    // Set upstream transition to none temporarily
    _tram.upstream = transNone;

    // Set values immediately
    _tram.set(tramify(data));

    // Only restore upstream in preview mode
    _tram.upstream = computed;
  }

  // (Published) Set styles immediately on specified jquery element
  function stylePub(el, data) {
    tram(el).set(tramify(data));
  }

  // Build a clean object for tram
  function tramify(obj) {
    var result = {};
    var found = false;
    for (var x in obj) {
      if (x === 'transition') continue;
      result[x] = obj[x];
      found = true;
    }
    // If empty, return null for tram.set/stop compliance
    return found ? result : null;
  }

  // Events used by other webflow modules
  var events = {
    reset: function(i, el) {
      el.__wf_intro = null;
    },
    intro: function(i, el) {
      if (el.__wf_intro) return;
      el.__wf_intro = true;
      $(el).triggerHandler(introEvent);
    },
    outro: function(i, el) {
      if (!el.__wf_intro) return;
      el.__wf_intro = null;
      $(el).triggerHandler(outroEvent);
    }
  };

  // Trigger events in queue + point to sync methods
  function initEvents() {
    var count = eventQueue.length;
    for (var i = 0; i < count; i++) {
      var memo = eventQueue[i];
      memo[0](0, memo[1]);
    }
    eventQueue = [];
    $.extend(api.events, events);
  }

  // Replace events with async methods prior to init
  function asyncEvents() {
    _.each(events, function(func, name) {
      api.events[name] = function(i, el) {
        eventQueue.push([func, el]);
      };
    });
  }

  asyncEvents();

  // Export module
  return api;
};

},{"./webflow-lib":7}],7:[function(require,module,exports){
'use strict';

/**
 * Webflow: Core site library
 */

var Webflow = {};
var modules = {};
var primary = [];
var secondary = window.Webflow || [];
var $ = window.jQuery;
var $win = $(window);
var $doc = $(document);
var isFunction = $.isFunction;
var _ = Webflow._ = require('../plugins/underscore-custom');
var tram = require('../plugins/tram-min') && $.tram;
var domready = false;
var Modernizr = window.Modernizr;
var noop = function() {};
tram.config.hideBackface = false;
tram.config.keepInherited = true;

/**
 * Webflow.define - Define a named module
 * @param  {string} name
 * @param  {function} factory
 * @return {object}
 */
Webflow.define = function(name, factory) {
  if (modules[name]) unbindModule(modules[name]);
  var instance = modules[name] = factory($, _) || {};
  bindModule(instance);
  return instance;
};

/**
 * Webflow.require - Require a named module
 * @param  {string} name
 * @return {object}
 */
Webflow.require = function(name) {
  return modules[name];
};

function bindModule(module) {
  // If running in Webflow app, subscribe to design/preview events
  if (Webflow.env()) {
    isFunction(module.design) && $win.on('__wf_design', module.design);
    isFunction(module.preview) && $win.on('__wf_preview', module.preview);
  }
  // Subscribe to front-end destroy event
  isFunction(module.destroy) && $win.on('__wf_destroy', module.destroy);
  // Look for a ready method on module
  if (module.ready && isFunction(module.ready)) {
    // If domready has already happened, call ready method
    if (domready) module.ready();
    // Otherwise push ready method into primary queue
    else primary.push(module.ready);
  }
}

function unbindModule(module) {
  // Unsubscribe module from window events
  isFunction(module.design) && $win.off('__wf_design', module.design);
  isFunction(module.preview) && $win.off('__wf_preview', module.preview);
  isFunction(module.destroy) && $win.off('__wf_destroy', module.destroy);

  // Remove from primary queue if domready hasn't happened
  if (!domready) {
    primary = _.filter(primary, function(readyFn) {
      return readyFn !== module.ready;
    });
  }
}

/**
 * Webflow.push - Add a ready handler into secondary queue
 * @param {function} ready  Callback to invoke on domready
 */
Webflow.push = function(ready) {
  // If domready has already happened, invoke handler
  if (domready) {
    isFunction(ready) && ready();
    return;
  }
  // Otherwise push into secondary queue
  secondary.push(ready);
};

/**
 * Webflow.env - Get the state of the Webflow app
 * @param {string} mode [optional]
 * @return {boolean}
 */
Webflow.env = function(mode) {
  var designFlag = window.__wf_design;
  var inApp = typeof designFlag != 'undefined';
  if (!mode) return inApp;
  if (mode == 'design') return inApp && designFlag;
  if (mode == 'preview') return inApp && !designFlag;
  if (mode == 'slug') return inApp && window.__wf_slug;
  if (mode == 'editor') return window.WebflowEditor;
  if (mode == 'test') return window.__wf_test;
};

// Feature detects + browser sniffs  ಠ_ಠ
var userAgent = navigator.userAgent.toLowerCase();
var appVersion = navigator.appVersion.toLowerCase();
var touch = Webflow.env.touch = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch;
var chrome = Webflow.env.chrome = /chrome/.test(userAgent) && /Google/.test(navigator.vendor) && parseInt(appVersion.match(/chrome\/(\d+)\./)[1], 10);
var ios = Webflow.env.ios = Modernizr && Modernizr.ios;
Webflow.env.safari = /safari/.test(userAgent) && !chrome && !ios;

// Maintain current touch target to prevent late clicks on touch devices
var touchTarget;
// Listen for both events to support touch/mouse hybrid devices
touch && $doc.on('touchstart mousedown', function(evt) {
  touchTarget = evt.target;
});

/**
 * Webflow.validClick - validate click target against current touch target
 * @param  {HTMLElement} clickTarget  Element being clicked
 * @return {Boolean}  True if click target is valid (always true on non-touch)
 */
Webflow.validClick = touch ? function(clickTarget) {
  return clickTarget === touchTarget || $.contains(clickTarget, touchTarget);
} : function() { return true; };

/**
 * Webflow.resize, Webflow.scroll - throttled event proxies
 */
var resizeEvents = 'resize.webflow orientationchange.webflow load.webflow';
var scrollEvents = 'scroll.webflow ' + resizeEvents;
Webflow.resize = eventProxy($win, resizeEvents);
Webflow.scroll = eventProxy($win, scrollEvents);
Webflow.redraw = eventProxy();

// Create a proxy instance for throttled events
function eventProxy(target, types) {

  // Set up throttled method (using custom frame-based _.throttle)
  var handlers = [];
  var proxy = {};
  proxy.up = _.throttle(function(evt) {
    _.each(handlers, function(h) { h(evt); });
  });

  // Bind events to target
  if (target && types) target.on(types, proxy.up);

  /**
   * Add an event handler
   * @param  {function} handler
   */
  proxy.on = function(handler) {
    if (typeof handler != 'function') return;
    if (_.contains(handlers, handler)) return;
    handlers.push(handler);
  };

  /**
   * Remove an event handler
   * @param  {function} handler
   */
  proxy.off = function(handler) {
    // If no arguments supplied, clear all handlers
    if (!arguments.length) {
      handlers = [];
      return;
    }
    // Otherwise, remove handler from the list
    handlers = _.filter(handlers, function(h) {
      return h !== handler;
    });
  };

  return proxy;
}

// Provide optional IX events to components
Webflow.ixEvents = function() {
  var ix = Webflow.require('ix');
  return (ix && ix.events) || {
    reset: noop,
    intro: noop,
    outro: noop
  };
};

// Webflow.location - Wrap window.location in api
Webflow.location = function(url) {
  window.location = url;
};

// Webflow.app - Designer-specific methods
Webflow.app = Webflow.env() ? {} : null;
if (Webflow.app) {

  // Trigger redraw for specific elements
  var redraw = new Event('__wf_redraw');
  Webflow.app.redrawElement = function(i, el) { el.dispatchEvent(redraw); };

  // Webflow.location - Re-route location change to trigger an event
  Webflow.location = function(url) {
    window.dispatchEvent(new CustomEvent('__wf_location', { detail: url }));
  };
}

// Webflow.ready - Call primary and secondary handlers
Webflow.ready = function() {
  domready = true;
  _.each(primary.concat(secondary), callReady);
  // Trigger resize
  Webflow.resize.up();
};

function callReady(readyFn) {
  isFunction(readyFn) && readyFn();
}

/**
 * Webflow.load - Add a window load handler that will run even if load event has already happened
 * @param  {function} handler
 */
var deferLoad;
Webflow.load = function(handler) {
  deferLoad.then(handler);
};

function bindLoad() {
  // Reject any previous deferred (to support destroy)
  if (deferLoad) {
    deferLoad.reject();
    $win.off('load', deferLoad.resolve);
  }
  // Create deferred and bind window load event
  deferLoad = new $.Deferred();
  $win.on('load', deferLoad.resolve);
}

// Webflow.destroy - Trigger a destroy event for all modules
Webflow.destroy = function() {
  $win.triggerHandler('__wf_destroy');

  // Unbind and clear modules
  _.each(modules, unbindModule);
  modules = {};

  // Clear any proxy event handlers
  Webflow.resize.off();
  Webflow.scroll.off();
  Webflow.redraw.off();

  // If load event has not yet fired, replace the deferred
  if (deferLoad.state() == 'pending') bindLoad();
};

// Listen for domready
$(Webflow.ready);

// Listen for window.onload and resolve deferred
bindLoad();

// Export commonjs module
module.exports = Webflow;

},{"../plugins/tram-min":16,"../plugins/underscore-custom":17}],8:[function(require,module,exports){
'use strict';

/**
 * Webflow: Lightbox component
 */

var Webflow = require('./webflow-lib');

function createLightbox(window, document, $, undefined) {
  var tram = $.tram;
  var isArray = Array.isArray;
  var namespace = 'w-lightbox';
  var prefix = namespace + '-';
  var prefixRegex = /(^|\s+)/g;

  // Array of objects describing items to be displayed.
  var items = [];

  // Index of the currently displayed item.
  var currentIndex;

  // Object holding references to jQuery wrapped nodes.
  var $refs;

  // Instance of Spinner
  var spinner;

  function lightbox(thing, index) {
    items = isArray(thing) ? thing : [thing];

    if (!$refs) {
      lightbox.build();
    }

    if (items.length > 1) {
      $refs.items = $refs.empty;

      items.forEach(function (item) {
        var $thumbnail = dom('thumbnail');
        var $item = dom('item').append($thumbnail);

        $refs.items = $refs.items.add($item);

        loadImage(item.thumbnailUrl || item.url, function ($image) {
          if ($image.prop('width') > $image.prop('height')) {
            addClass($image, 'wide');
          } else {
            addClass($image, 'tall');
          }
          $thumbnail.append(addClass($image, 'thumbnail-image'));
        });
      });

      $refs.strip.empty().append($refs.items);
      addClass($refs.content, 'group');
    }

    tram(
      // Focus the lightbox to receive keyboard events.
      removeClass($refs.lightbox, 'hide').focus()
    )
      .add('opacity .3s')
      .start({opacity: 1});

    // Prevent document from scrolling while lightbox is active.
    addClass($refs.html, 'noscroll');

    return lightbox.show(index || 0);
  }

  /**
   * Creates the DOM structure required by the lightbox.
   */
  lightbox.build = function () {
    // In case `build` is called more than once.
    lightbox.destroy();

    $refs = {
      html: $(document.documentElement),
      // Empty jQuery object can be used to build new ones using `.add`.
      empty: $()
    };

    $refs.arrowLeft = dom('control left inactive');
    $refs.arrowRight = dom('control right inactive');
    $refs.close = dom('control close');

    $refs.spinner = dom('spinner');
    $refs.strip = dom('strip');

    spinner = new Spinner($refs.spinner, prefixed('hide'));

    $refs.content = dom('content')
      .append($refs.spinner, $refs.arrowLeft, $refs.arrowRight, $refs.close);

    $refs.container = dom('container')
      .append($refs.content, $refs.strip);

    $refs.lightbox = dom('backdrop hide')
      .append($refs.container);

      // We are delegating events for performance reasons and also
      // to not have to reattach handlers when images change.
      $refs.strip.on('tap', selector('item'), itemTapHandler);
      $refs.content
        .on('swipe', swipeHandler)
        .on('tap', selector('left'), handlerPrev)
        .on('tap', selector('right'), handlerNext)
        .on('tap', selector('close'), handlerHide)
        .on('tap', selector('image, caption'), handlerNext);
      $refs.container
        .on('tap', selector('view, strip'), handlerHide)
        // Prevent images from being dragged around.
        .on('dragstart', selector('img'), preventDefault);
      $refs.lightbox
        .on('keydown', keyHandler)
        // IE loses focus to inner nodes without letting us know.
        .on('focusin', focusThis);

    // The `tabindex` attribute is needed to enable non-input elements
    // to receive keyboard events.
    $('body').append($refs.lightbox.prop('tabIndex', 0));

    return lightbox;
  };

  /**
   * Dispose of DOM nodes created by the lightbox.
   */
  lightbox.destroy = function () {
    if (!$refs) {
      return;
    }

    // Event handlers are also removed.
    $refs.lightbox.remove();
    $refs = undefined;
  };

  /**
   * Show a specific item.
   */
  lightbox.show = function (index) {
    // Bail if we are already showing this item.
    if (index === currentIndex) {
      return;
    }

    var item = items[index];
    if (!item) { return lightbox.hide(); }

    var previousIndex = currentIndex;
    currentIndex = index;
    spinner.show();

    // For videos, load an empty SVG with the video dimensions to preserve
    // the video’s aspect ratio while being responsive.
    var url = item.html && svgDataUri(item.width, item.height) || item.url;
    loadImage(url, function ($image) {
      // Make sure this is the last item requested to be shown since
      // images can finish loading in a different order than they were
      // requested in.
      if (index != currentIndex) {
        return;
      }

      var $figure = dom('figure', 'figure').append(addClass($image, 'image'));
      var $frame = dom('frame').append($figure);
      var $newView = dom('view').append($frame);
      var $html, isIframe;

      if (item.html) {
        $html = $(item.html);
        isIframe = $html.is('iframe');

        if (isIframe) {
          $html.on('load', transitionToNewView);
        }

        $figure.append(addClass($html, 'embed'));
      }

      if (item.caption) {
        $figure.append(dom('caption', 'figcaption').text(item.caption));
      }

      $refs.spinner.before($newView);

      if (!isIframe) {
        transitionToNewView();
      }

      function transitionToNewView() {
        spinner.hide();

        if (index != currentIndex) {
          $newView.remove();
          return;
        }


        toggleClass($refs.arrowLeft, 'inactive', index <= 0);
        toggleClass($refs.arrowRight, 'inactive', index >= items.length - 1);

        if ($refs.view) {
          tram($refs.view)
            .add('opacity .3s')
            .start({opacity: 0})
            .then(remover($refs.view));

          tram($newView)
            .add('opacity .3s')
            .add('transform .3s')
            .set({x: index > previousIndex ? '80px' : '-80px'})
            .start({opacity: 1, x: 0});
        } else {
          $newView.css('opacity', 1);
        }

        $refs.view = $newView;

        if ($refs.items) {
          // Mark proper thumbnail as active
          addClass(removeClass($refs.items, 'active').eq(index), 'active');
        }
      }
    });

    return lightbox;
  };

  /**
   * Hides the lightbox.
   */
  lightbox.hide = function () {
    tram($refs.lightbox)
      .add('opacity .3s')
      .start({opacity: 0})
      .then(hideLightbox);

    return lightbox;
  };

  lightbox.prev = function () {
    if (currentIndex > 0) {
      lightbox.show(currentIndex - 1);
    }
  };

  lightbox.next = function () {
    if (currentIndex < items.length - 1) {
      lightbox.show(currentIndex + 1);
    }
  };

  function createHandler(action) {
    return function (event) {
      // We only care about events triggered directly on the bound selectors.
      if (this != event.target) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();

      action();
    };
  }

  var handlerPrev = createHandler(lightbox.prev);
  var handlerNext = createHandler(lightbox.next);
  var handlerHide = createHandler(lightbox.hide);

  var itemTapHandler = function(event) {
    var index = $(this).index();

    event.preventDefault();
    lightbox.show(index);
  };

  var swipeHandler = function (event, data) {
    // Prevent scrolling.
    event.preventDefault();

    if (data.direction == 'left') {
      lightbox.next();
    } else if (data.direction == 'right') {
      lightbox.prev();
    }
  };

  var focusThis = function () {
    this.focus();
  };

  function preventDefault(event) {
    event.preventDefault();
  }

  function keyHandler(event) {
    var keyCode = event.keyCode;

    // [esc]
    if (keyCode == 27) {
      lightbox.hide();
    }

    // [◀]
    else if (keyCode == 37) {
      lightbox.prev();
    }

    // [▶]
    else if (keyCode == 39) {
      lightbox.next();
    }
  }

  function hideLightbox() {
    removeClass($refs.html, 'noscroll');
    addClass($refs.lightbox, 'hide');
    $refs.strip.empty();
    $refs.view && $refs.view.remove();

    // Reset some stuff
    removeClass($refs.content, 'group');
    addClass($refs.arrowLeft, 'inactive');
    addClass($refs.arrowRight, 'inactive');

    currentIndex = $refs.view = undefined;
  }

  function loadImage(url, callback) {
    var $image = dom('img', 'img');

    $image.one('load', function () {
      callback($image);
    });

    // Start loading image.
    $image.attr('src', url);

    return $image;
  }

  function remover($element) {
    return function () {
      $element.remove();
    };
  }

  /**
   * Spinner
   */
  function Spinner($spinner, className, delay) {
    this.$element = $spinner;
    this.className = className;
    this.delay = delay || 200;
    this.hide();
  }

  Spinner.prototype.show = function () {
    var spinner = this;

    // Bail if we are already showing the spinner.
    if (spinner.timeoutId) {
      return;
    }

    spinner.timeoutId = setTimeout(function () {
      spinner.$element.removeClass(spinner.className);
      delete spinner.timeoutId;
    }, spinner.delay);
  };

  Spinner.prototype.hide = function () {
    var spinner = this;
    if (spinner.timeoutId) {
      clearTimeout(spinner.timeoutId);
      delete spinner.timeoutId;
      return;
    }

    spinner.$element.addClass(spinner.className);
  };

  function prefixed(string, isSelector) {
    return string.replace(prefixRegex, (isSelector ? ' .' : ' ') + prefix);
  }

  function selector(string) {
    return prefixed(string, true);
  }

  /**
   * jQuery.addClass with auto-prefixing
   * @param  {jQuery} Element to add class to
   * @param  {string} Class name that will be prefixed and added to element
   * @return {jQuery}
   */
  function addClass($element, className) {
    return $element.addClass(prefixed(className));
  }

  /**
   * jQuery.removeClass with auto-prefixing
   * @param  {jQuery} Element to remove class from
   * @param  {string} Class name that will be prefixed and removed from element
   * @return {jQuery}
   */
  function removeClass($element, className) {
    return $element.removeClass(prefixed(className));
  }

  /**
   * jQuery.toggleClass with auto-prefixing
   * @param  {jQuery}  Element where class will be toggled
   * @param  {string}  Class name that will be prefixed and toggled
   * @param  {boolean} Optional boolean that determines if class will be added or removed
   * @return {jQuery}
   */
  function toggleClass($element, className, shouldAdd) {
    return $element.toggleClass(prefixed(className), shouldAdd);
  }

  /**
   * Create a new DOM element wrapped in a jQuery object,
   * decorated with our custom methods.
   * @param  {string} className
   * @param  {string} [tag]
   * @return {jQuery}
   */
  function dom(className, tag) {
    return addClass($(document.createElement(tag || 'div')), className);
  }

  function isObject(value) {
    return typeof value == 'object' && null != value && !isArray(value);
  }

  function svgDataUri(width, height) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '"/>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURI(svg);
  }

  // Compute some dimensions manually for iOS, because of buggy support for VH.
  // Also, Android built-in browser does not support viewport units.
  (function () {
    var ua = window.navigator.userAgent;
    var iOS = /(iPhone|iPod|iPad).+AppleWebKit/i.test(ua);
    var android = ua.indexOf('Android ') > -1 && ua.indexOf('Chrome') == -1;

    if (!iOS && !android) {
      return;
    }

    var styleNode = document.createElement('style');
    document.head.appendChild(styleNode);
    window.addEventListener('orientationchange', refresh, true);

    function refresh() {
      var vh = window.innerHeight;
      var vw = window.innerWidth;
      var content =
        '.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {' +
          'height:' + vh + 'px' +
        '}' +
        '.w-lightbox-view {' +
          'width:' + vw + 'px' +
        '}' +
        '.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {' +
          'height:' + (0.86 * vh) + 'px' +
        '}' +
        '.w-lightbox-image {' +
          'max-width:' + vw + 'px;' +
          'max-height:' + vh + 'px' +
        '}' +
        '.w-lightbox-group .w-lightbox-image {' +
          'max-height:' + (0.86 * vh) + 'px' +
        '}' +
        '.w-lightbox-strip {' +
          'padding: 0 ' + (0.01 * vh) + 'px' +
        '}' +
        '.w-lightbox-item {' +
          'width:' + (0.1 * vh) + 'px;' +
          'padding:' + (0.02 * vh) + 'px ' + (0.01 * vh) + 'px' +
        '}' +
        '.w-lightbox-thumbnail {' +
          'height:' + (0.1 * vh) + 'px' +
        '}' +
        '@media (min-width: 768px) {' +
          '.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {' +
            'height:' + (0.96 * vh) + 'px' +
          '}' +
          '.w-lightbox-content {' +
            'margin-top:' + (0.02 * vh) + 'px' +
          '}' +
          '.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {' +
            'height:' + (0.84 * vh) + 'px' +
          '}' +
          '.w-lightbox-image {' +
            'max-width:' + (0.96 * vw) + 'px;' +
            'max-height:' + (0.96 * vh) + 'px' +
          '}' +
          '.w-lightbox-group .w-lightbox-image {' +
            'max-width:' + (0.823 * vw) + 'px;' +
            'max-height:' + (0.84 * vh) + 'px' +
          '}' +
        '}';

      styleNode.textContent = content;
    }

    refresh();
  })();

  return lightbox;
}

module.exports = function($, _) {
  var api = {};
  var lightbox = createLightbox(window, document, $);
  var $doc = $(document);
  var $body;
  var $lightboxes;
  var designer;
  var inApp = Webflow.env();
  var namespace = '.w-lightbox';
  var groups;

  // -----------------------------------
  // Module methods

  api.ready = api.design = api.preview = init;

  // -----------------------------------
  // Private methods

  function init() {
    designer = inApp && Webflow.env('design');
    $body = $(document.body);

    // Reset Lightbox
    lightbox.destroy();

    // Reset groups
    groups = {};

    // Find all instances on the page
    $lightboxes = $doc.find(namespace);

    // Instantiate all lighboxes
    $lightboxes.webflowLightBox();
  }

  jQuery.fn.extend({
    webflowLightBox: function() {
      var $el = this;
      $.each($el, function(i, el) {
        // Store state in data
        var data = $.data(el, namespace);
        if (!data) data = $.data(el, namespace, {
          el: $(el),
          mode: 'images',
          images: [],
          embed: ''
        });

        // Remove old events
        data.el.off(namespace);

        // Set config from json script tag
        configure(data);

        // Add events based on mode
        if (designer) {
          data.el.on('setting' + namespace, configure.bind(null, data));
        } else {
          data.el
            .on('tap' + namespace, tapHandler(data))
            // Prevent page scrolling to top when clicking on lightbox triggers.
            .on('click' + namespace, function (e) { e.preventDefault(); });
        }
      });
    }
  });

  function configure(data) {
    var json = data.el.children('.w-json').html();
    var groupName, groupItems;

    if (!json) {
      data.items = [];
      return;
    }

    try {
      json = JSON.parse(json);

      supportOldLightboxJson(json);

      groupName = json.group;

      if (groupName) {
        groupItems = groups[groupName];
        if (!groupItems) {
          groupItems = groups[groupName] = [];
        }

        data.items = groupItems;

        if (json.items.length) {
          data.index = groupItems.length;
          groupItems.push.apply(groupItems, json.items);
        }
      } else {
        data.items = json.items;
      }
    }
    catch (e) {
      console.error('Malformed lightbox JSON configuration.', e.message);
    }
  }

  function tapHandler(data) {
    return function () {
      data.items.length && lightbox(data.items, data.index || 0);
    };
  }

  function supportOldLightboxJson(data) {
    if (data.images) {
      data.images.forEach(function (item) {
        item.type = 'image';
      });
      data.items = data.images;
    }

    if (data.embed) {
      data.embed.type = 'video';
      data.items = [data.embed];
    }

    if (data.groupId) {
      data.group = data.groupId;
    }
  }

  // Export module
  return api;
};

},{"./webflow-lib":7}],9:[function(require,module,exports){
'use strict';

/**
 * Webflow: Auto-select links to current page or section
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var api = {};
  var $win = $(window);
  var designer;
  var inApp = Webflow.env();
  var location = window.location;
  var tempLink = document.createElement('a');
  var linkCurrent = 'w--current';
  var validHash = /^#[a-zA-Z][\w:.-]*$/;
  var indexPage = /index\.(html|php)$/;
  var dirList = /\/$/;
  var anchors;
  var slug;

  // -----------------------------------
  // Module methods

  api.ready = api.design = api.preview = init;

  // -----------------------------------
  // Private methods

  function init() {
    designer = inApp && Webflow.env('design');
    slug = Webflow.env('slug') || location.pathname || '';

    // Reset scroll listener, init anchors
    Webflow.scroll.off(scroll);
    anchors = [];

    // Test all links for a selectable href
    var links = document.links;
    for (var i = 0; i < links.length; ++i) {
      select(links[i]);
    }

    // Listen for scroll if any anchors exist
    if (anchors.length) {
      Webflow.scroll.on(scroll);
      scroll();
    }
  }

  function select(link) {
    var href = (designer && link.getAttribute('href-disabled')) || link.getAttribute('href');
    tempLink.href = href;

    // Ignore any hrefs with a colon to safely avoid all uri schemes
    if (href.indexOf(':') >= 0) return;

    var $link = $(link);

    // Check for valid hash links w/ sections and use scroll anchor
    if (href.indexOf('#') === 0 && validHash.test(href)) {
      var $section = $(href);
      $section.length && anchors.push({ link: $link, sec: $section, active: false });
      return;
    }

    // Ignore empty # links
    if (href === '#') return;

    // Determine whether the link should be selected
    var match = (tempLink.href === location.href) || (href === slug) || (indexPage.test(href) && dirList.test(slug));
    setClass($link, linkCurrent, match);
  }

  function scroll() {
    var viewTop = $win.scrollTop();
    var viewHeight = $win.height();

    // Check each anchor for a section in view
    _.each(anchors, function(anchor) {
      var $link = anchor.link;
      var $section = anchor.sec;
      var top = $section.offset().top;
      var height = $section.outerHeight();
      var offset = viewHeight * 0.5;
      var active = ($section.is(':visible') &&
        top + height - offset >= viewTop &&
        top + offset <= viewTop + viewHeight);
      if (anchor.active === active) return;
      anchor.active = active;
      setClass($link, linkCurrent, active);
      if (designer) $link[0].__wf_current = active;
    });
  }

  function setClass($elem, className, add) {
    var exists = $elem.hasClass(className);
    if (add && exists) return;
    if (!add && !exists) return;
    add ? $elem.addClass(className) : $elem.removeClass(className);
  }

  // Export module
  return api;
};

},{"./webflow-lib":7}],10:[function(require,module,exports){
'use strict';

/**
 * Webflow: Maps widget
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var api = {};
  var $doc = $(document);
  var google = null;
  var $maps;
  var namespace = '.w-widget-map';

  // -----------------------------------
  // Module methods

  api.ready = function() {
    // Init Maps on the front-end
    if (!Webflow.env()) initMaps();
  };

  api.preview = function() {
    // Update active map nodes
    $maps = $doc.find(namespace);
    // Listen for resize events
    Webflow.resize.off(triggerRedraw);
    if ($maps.length) {
      Webflow.resize.on(triggerRedraw);
      triggerRedraw();
    }
  };

  api.design = function(evt) {
    // Update active map nodes
    $maps = $doc.find(namespace);
    // Stop listening for resize events
    Webflow.resize.off(triggerRedraw);
    // Redraw to account for page changes
    $maps.length && _.defer(triggerRedraw);
  };

  api.destroy = removeListeners;

  // -----------------------------------
  // Private methods

  // Trigger redraw in designer or preview mode
  function triggerRedraw() {
    if ($maps.length && Webflow.app) {
      $maps.each(Webflow.app.redrawElement);
    }
  }

  function initMaps() {
    $maps = $doc.find(namespace);
    if (!$maps.length) return;

    if (google === null) {
      $.getScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=_wf_maps_loaded');
      window._wf_maps_loaded = mapsLoaded;
    } else {
      mapsLoaded();
    }

    function mapsLoaded() {
      window._wf_maps_loaded = function() {};
      google = window.google;
      $maps.each(renderMap);
      removeListeners();
      addListeners();
    }
  }

  function removeListeners() {
    Webflow.resize.off(resizeMaps);
    Webflow.redraw.off(resizeMaps);
  }

  function addListeners() {
    Webflow.resize.on(resizeMaps);
    Webflow.redraw.on(resizeMaps);
  }

  // Render map onto each element
  function renderMap(i, el) {
    var data = $(el).data();
    getState(el, data);
  }

  function resizeMaps() {
    $maps.each(resizeMap);
  }

  // Resize map when window changes
  function resizeMap(i, el) {
    var state = getState(el);
    google.maps.event.trigger(state.map, 'resize');
    state.setMapPosition();
  }

  // Store state on element data
  var store = 'w-widget-map';
  function getState(el, data) {

    var state = $.data(el, store);
    if (state) return state;

    var $el = $(el);
    state = $.data(el, store, {
      // Default options
      latLng: '51.511214,-0.119824',
      tooltip: '',
      style: 'roadmap',
      zoom: 12,

      // Marker
      marker: new google.maps.Marker({
        draggable: false
      }),

      // Tooltip infowindow
      infowindow: new google.maps.InfoWindow({
        disableAutoPan: true
      })
    });

    // LatLng center point
    var latLng = data.widgetLatlng || state.latLng;
    state.latLng = latLng;
    var coords = latLng.split(',');
    var latLngObj = new google.maps.LatLng(coords[0], coords[1]);
    state.latLngObj = latLngObj;

    // Disable touch events
    var mapDraggable = (Webflow.env.touch && data.disableTouch) ? false : true;

    // Map instance
    state.map = new google.maps.Map(el, {
      center: state.latLngObj,
      zoom: state.zoom,
      maxZoom: 18,
      mapTypeControl: false,
      panControl: false,
      streetViewControl: false,
      scrollwheel: !data.disableScroll,
      draggable: mapDraggable,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      mapTypeId: state.style
    });
    state.marker.setMap(state.map);

    // Set map position and offset
    state.setMapPosition = function() {
      state.map.setCenter(state.latLngObj);
      var offsetX = 0;
      var offsetY = 0;
      var padding = $el.css(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']);
      offsetX -= parseInt(padding.paddingLeft, 10);
      offsetX += parseInt(padding.paddingRight, 10);
      offsetY -= parseInt(padding.paddingTop, 10);
      offsetY += parseInt(padding.paddingBottom, 10);
      if (offsetX || offsetY) {
        state.map.panBy(offsetX, offsetY);
      }
      $el.css('position', ''); // Remove injected position
    };

    // Fix position after first tiles have loaded
    google.maps.event.addListener(state.map, 'tilesloaded', function() {
      google.maps.event.clearListeners(state.map, 'tilesloaded');
      state.setMapPosition();
    });

    // Set initial position
    state.setMapPosition();
    state.marker.setPosition(state.latLngObj);
    state.infowindow.setPosition(state.latLngObj);

    // Draw tooltip
    var tooltip = data.widgetTooltip;
    if (tooltip) {
      state.tooltip = tooltip;
      state.infowindow.setContent(tooltip);
      if (!state.infowindowOpen) {
        state.infowindow.open(state.map, state.marker);
        state.infowindowOpen = true;
      }
    }

    // Map style - options.style
    var style = data.widgetStyle;
    if (style) {
      state.map.setMapTypeId(style);
    }

    // Zoom - options.zoom
    var zoom = data.widgetZoom;
    if (zoom != null) {
      state.zoom = zoom;
      state.map.setZoom(+zoom);
    }

    // Click marker to open in google maps
    google.maps.event.addListener(state.marker, 'click', function() {
      window.open('https://maps.google.com/?z=' + state.zoom + '&daddr=' + state.latLng);
    });

    return state;
  }

  // Export module
  return api;
};

},{"./webflow-lib":7}],11:[function(require,module,exports){
'use strict';

/**
 * Webflow: Navbar component
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var api = {};
  var tram = $.tram;
  var $win = $(window);
  var $doc = $(document);
  var $body;
  var $navbars;
  var designer;
  var inApp = Webflow.env();
  var overlay = '<div class="w-nav-overlay" data-wf-ignore />';
  var namespace = '.w-nav';
  var buttonOpen = 'w--open';
  var menuOpen = 'w--nav-menu-open';
  var linkOpen = 'w--nav-link-open';
  var ix = Webflow.ixEvents();

  // -----------------------------------
  // Module methods

  api.ready = api.design = api.preview = init;
  api.destroy = removeListeners;

  // -----------------------------------
  // Private methods

  function init() {
    designer = inApp && Webflow.env('design');
    $body = $(document.body);

    // Find all instances on the page
    $navbars = $doc.find(namespace);
    if (!$navbars.length) return;
    $navbars.each(build);

    // Wire events
    removeListeners();
    addListeners();
  }

  function removeListeners() {
    Webflow.resize.off(resizeAll);
  }

  function addListeners() {
    Webflow.resize.on(resizeAll);
  }

  function resizeAll() {
    $navbars.each(resize);
  }

  function build(i, el) {
    var $el = $(el);

    // Store state in data
    var data = $.data(el, namespace);
    if (!data) data = $.data(el, namespace, { open: false, el: $el, config: {} });
    data.menu = $el.find('.w-nav-menu');
    data.links = data.menu.find('.w-nav-link');
    data.dropdowns = data.menu.find('.w-dropdown');
    data.button = $el.find('.w-nav-button');
    data.container = $el.find('.w-container');
    data.outside = outside(data);

    // Remove old events
    data.el.off(namespace);
    data.button.off(namespace);
    data.menu.off(namespace);

    // Set config from data attributes
    configure(data);

    // Add events based on mode
    if (designer) {
      removeOverlay(data);
      data.el.on('setting' + namespace, handler(data));
    } else {
      addOverlay(data);
      data.button.on('tap' + namespace, toggle(data));
      data.menu.on('click' + namespace, 'a', navigate(data));
    }

    // Trigger initial resize
    resize(i, el);
  }

  function removeOverlay(data) {
    if (!data.overlay) return;
    close(data, true);
    data.overlay.remove();
    data.overlay = null;
  }

  function addOverlay(data) {
    if (data.overlay) return;
    data.overlay = $(overlay).appendTo(data.el);
    data.parent = data.menu.parent();
    close(data, true);
  }

  function configure(data) {
    var config = {};
    var old = data.config || {};

    // Set config options from data attributes
    var animation = config.animation = data.el.attr('data-animation') || 'default';
    config.animOver = /^over/.test(animation);
    config.animDirect = /left$/.test(animation) ? -1 : 1;

    // Re-open menu if the animation type changed
    if (old.animation != animation) {
      data.open && _.defer(reopen, data);
    }

    config.easing = data.el.attr('data-easing') || 'ease';
    config.easing2 = data.el.attr('data-easing2') || 'ease';

    var duration = data.el.attr('data-duration');
    config.duration = duration != null ? +duration : 400;

    config.docHeight = data.el.attr('data-doc-height');

    // Store config in data
    data.config = config;
  }

  function handler(data) {
    return function(evt, options) {
      options = options || {};
      var winWidth = $win.width();
      configure(data);
      options.open === true && open(data, true);
      options.open === false && close(data, true);
      // Reopen if media query changed after setting
      data.open && _.defer(function() {
        if (winWidth != $win.width()) reopen(data);
      });
    };
  }

  function reopen(data) {
    if (!data.open) return;
    close(data, true);
    open(data, true);
  }

  function toggle(data) {
    // Debounce toggle to wait for accurate open state
    return _.debounce(function(evt) {
      data.open ? close(data) : open(data);
    });
  }

  function navigate(data) {
    return function(evt) {
      var link = $(this);
      var href = link.attr('href');

      // Avoid late clicks on touch devices
      if (!Webflow.validClick(evt.currentTarget)) {
        evt.preventDefault();
        return;
      }

      // Close when navigating to an in-page anchor
      if (href && href.indexOf('#') === 0 && data.open) {
        close(data);
      }
    };
  }

  function outside(data) {
    // Unbind previous tap handler if it exists
    if (data.outside) $doc.off('tap' + namespace, data.outside);

    // Close menu when tapped outside, debounced to wait for state
    return _.debounce(function(evt) {
      if (!data.open) return;
      var menu = $(evt.target).closest('.w-nav-menu');
      if (!data.menu.is(menu)) {
        close(data);
      }
    });
  }

  function resize(i, el) {
    var data = $.data(el, namespace);
    // Check for collapsed state based on button display
    var collapsed = data.collapsed = data.button.css('display') != 'none';
    // Close menu if button is no longer visible (and not in designer)
    if (data.open && !collapsed && !designer) close(data, true);
    // Set max-width of links + dropdowns to match container
    if (data.container.length) {
      var updateEachMax = updateMax(data);
      data.links.each(updateEachMax);
      data.dropdowns.each(updateEachMax);
    }
    // If currently open, update height to match body
    if (data.open) {
      setOverlayHeight(data);
    }
  }

  var maxWidth = 'max-width';
  function updateMax(data) {
    // Set max-width of each element to match container
    var containMax = data.container.css(maxWidth);
    if (containMax == 'none') containMax = '';
    return function(i, link) {
      link = $(link);
      link.css(maxWidth, '');
      // Don't set the max-width if an upstream value exists
      if (link.css(maxWidth) == 'none') link.css(maxWidth, containMax);
    };
  }

  function open(data, immediate) {
    if (data.open) return;
    data.open = true;
    data.menu.addClass(menuOpen);
    data.links.addClass(linkOpen);
    data.button.addClass(buttonOpen);
    var config = data.config;
    var animation = config.animation;
    if (animation == 'none' || !tram.support.transform) immediate = true;
    var bodyHeight = setOverlayHeight(data);
    var menuHeight = data.menu.outerHeight(true);
    var menuWidth = data.menu.outerWidth(true);
    var navHeight = data.el.height();
    var navbarEl = data.el[0];
    resize(0, navbarEl);
    ix.intro(0, navbarEl);
    Webflow.redraw.up();

    // Listen for tap outside events
    if (!designer) $doc.on('tap' + namespace, data.outside);

    // No transition for immediate
    if (immediate) return;

    var transConfig = 'transform ' + config.duration + 'ms ' + config.easing;

    // Add menu to overlay
    if (data.overlay) {
      data.overlay.show().append(data.menu);
    }

    // Over left/right
    if (config.animOver) {
      tram(data.menu)
        .add(transConfig)
        .set({ x: config.animDirect * menuWidth, height: bodyHeight }).start({ x: 0 });
        data.overlay && data.overlay.width(menuWidth);
      return;
    }

    // Drop Down
    var offsetY = navHeight + menuHeight;
    tram(data.menu)
      .add(transConfig)
      .set({ y: -offsetY }).start({ y: 0 });
  }

  function setOverlayHeight(data) {
    var config = data.config;
    var bodyHeight = config.docHeight ? $doc.height() : $body.height();
    if (config.animOver) {
      data.menu.height(bodyHeight);
    } else if (data.el.css('position') != 'fixed') {
      bodyHeight -= data.el.height();
    }
    data.overlay && data.overlay.height(bodyHeight);
    return bodyHeight;
  }

  function close(data, immediate) {
    if (!data.open) return;
    data.open = false;
    data.button.removeClass(buttonOpen);
    var config = data.config;
    if (config.animation == 'none' || !tram.support.transform) immediate = true;
    var animation = config.animation;
    ix.outro(0, data.el[0]);

    // Stop listening for tap outside events
    $doc.off('tap' + namespace, data.outside);

    if (immediate) {
      tram(data.menu).stop();
      complete();
      return;
    }

    var transConfig = 'transform ' + config.duration + 'ms ' + config.easing2;
    var menuHeight = data.menu.outerHeight(true);
    var menuWidth = data.menu.outerWidth(true);
    var navHeight = data.el.height();

    // Over left/right
    if (config.animOver) {
      tram(data.menu)
        .add(transConfig)
        .start({ x: menuWidth * config.animDirect }).then(complete);
      return;
    }

    // Drop Down
    var offsetY = navHeight + menuHeight;
    tram(data.menu)
      .add(transConfig)
      .start({ y: -offsetY }).then(complete);

    function complete() {
      data.menu.height('');
      tram(data.menu).set({ x: 0, y: 0 });
      data.menu.removeClass(menuOpen);
      data.links.removeClass(linkOpen);
      if (data.overlay && data.overlay.children().length) {
        // Move menu back to parent
        data.menu.appendTo(data.parent);
        data.overlay.attr('style', '').hide();
      }

      // Trigger event so other components can hook in (dropdown)
      data.el.triggerHandler('w-close');
    }
  }

  // Export module
  return api;
};

},{"./webflow-lib":7}],12:[function(require,module,exports){
'use strict';

/**
 * Webflow: Smooth scroll
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var $doc = $(document);
  var win = window;
  var loc = win.location;
  var history = inIframe() ? null : win.history;
  var validHash = /^[a-zA-Z][\w:.-]*$/;

  function inIframe() {
    try {
      return !!win.frameElement;
    } catch (e) {
      return true;
    }
  }

  function ready() {
    // If hash is already present on page load, scroll to it right away
    if (loc.hash) {
      findEl(loc.hash.substring(1));
    }

    // When clicking on a link, check if it links to another part of the page
    $doc.on('click', 'a', function(e) {
      if (Webflow.env('design')) {
        return;
      }

      // Ignore links being used by jQuery mobile
      if (window.$.mobile && $(e.currentTarget).hasClass('ui-link')) return;

      // Ignore empty # links
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        return;
      }

      var hash = this.hash ? this.hash.substring(1) : null;
      if (hash) {
        findEl(hash, e);
      }
    });
  }

  function findEl(hash, e) {
    if (!validHash.test(hash)) return;

    var el = $('#' + hash);
    if (!el.length) {
      return;
    }

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Push new history state
    if (loc.hash !== hash && history && history.pushState) {
      var oldHash = history.state && history.state.hash;
      if (oldHash !== hash) {
        history.pushState({ hash: hash }, '', '#' + hash);
      }
    }

    // If a fixed header exists, offset for the height
    var header = $('header, body > .header, body > .w-nav:not([data-no-scroll])');
    var offset = header.css('position') === 'fixed' ? header.outerHeight() : 0;

    win.setTimeout(function() {
      scroll(el, offset);
    }, e ? 0 : 300);
  }

  function scroll(el, offset){
    var start = $(win).scrollTop();
    var end = el.offset().top - offset;

    // If specified, scroll so that the element ends up in the middle of the viewport
    if (el.data('scroll') == 'mid') {
      var available = $(win).height() - offset;
      var elHeight = el.outerHeight();
      if (elHeight < available) {
        end -= Math.round((available - elHeight) / 2);
      }
    }

    var mult = 1;

    // Check for custom time multiplier on the body and the element
    $('body').add(el).each(function(i) {
      var time = parseFloat($(this).attr('data-scroll-time'), 10);
      if (!isNaN(time) && (time === 0 || time > 0)) {
        mult = time;
      }
    });

    // Shim for IE8 and below
    if (!Date.now) {
      Date.now = function() { return new Date().getTime(); };
    }

    var clock = Date.now();
    var animate = win.requestAnimationFrame || win.mozRequestAnimationFrame || win.webkitRequestAnimationFrame || function(fn) { win.setTimeout(fn, 15); };
    var duration = (472.143 * Math.log(Math.abs(start - end) +125) - 2000) * mult;

    var step = function() {
      var elapsed = Date.now() - clock;
      win.scroll(0, getY(start, end, elapsed, duration));

      if (elapsed <= duration) {
        animate(step);
      }
    };

    step();
  }

  function getY(start, end, elapsed, duration) {
    if (elapsed > duration) {
      return end;
    }

    return start + (end - start) * ease(elapsed / duration);
  }

  function ease(t) {
    return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
  }

  // Export module
  return { ready: ready };
};

},{"./webflow-lib":7}],13:[function(require,module,exports){
'use strict';

/**
 * Webflow: Slider component
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var api = {};
  var tram = $.tram;
  var $doc = $(document);
  var $sliders;
  var designer;
  var inApp = Webflow.env();
  var namespace = '.w-slider';
  var dot = '<div class="w-slider-dot" data-wf-ignore />';
  var ix = Webflow.ixEvents();
  var fallback;
  var redraw;

  // -----------------------------------
  // Module methods

  api.ready = function() {
    init();
  };

  api.design = function() {
    designer = true;
    init();
  };

  api.preview = function() {
    designer = false;
    init();
  };

  api.redraw = function() {
    redraw = true;
    init();
  };

  api.destroy = removeListeners;

  // -----------------------------------
  // Private methods

  function init() {
    // Find all sliders on the page
    $sliders = $doc.find(namespace);
    if (!$sliders.length) return;
    $sliders.filter(':visible').each(build);
    redraw = null;
    if (fallback) return;

    // Wire events
    removeListeners();
    addListeners();
  }

  function removeListeners() {
    Webflow.resize.off(renderAll);
    Webflow.redraw.off(api.redraw);
  }

  function addListeners() {
    Webflow.resize.on(renderAll);
    Webflow.redraw.on(api.redraw);
  }

  function renderAll() {
    $sliders.filter(':visible').each(render);
  }

  function build(i, el) {
    var $el = $(el);

    // Store slider state in data
    var data = $.data(el, namespace);
    if (!data) data = $.data(el, namespace, {
      index: 0,
      depth: 1,
      el: $el,
      config: {}
    });
    data.mask = $el.children('.w-slider-mask');
    data.left = $el.children('.w-slider-arrow-left');
    data.right = $el.children('.w-slider-arrow-right');
    data.nav = $el.children('.w-slider-nav');
    data.slides = data.mask.children('.w-slide');
    data.slides.each(ix.reset);
    if (redraw) data.maskWidth = 0;

    // Disable in old browsers
    if (!tram.support.transform) {
      data.left.hide();
      data.right.hide();
      data.nav.hide();
      fallback = true;
      return;
    }

    // Remove old events
    data.el.off(namespace);
    data.left.off(namespace);
    data.right.off(namespace);
    data.nav.off(namespace);

    // Set config from data attributes
    configure(data);

    // Add events based on mode
    if (designer) {
      data.el.on('setting' + namespace, handler(data));
      stopTimer(data);
      data.hasTimer = false;
    } else {
      data.el.on('swipe' + namespace, handler(data));
      data.left.on('tap' + namespace, previous(data));
      data.right.on('tap' + namespace, next(data));

      // Start timer if autoplay is true, only once
      if (data.config.autoplay && !data.hasTimer) {
        data.hasTimer = true;
        data.timerCount = 1;
        startTimer(data);
      }
    }

    // Listen to nav events
    data.nav.on('tap' + namespace, '> div', handler(data));

    // Remove gaps from formatted html (for inline-blocks)
    if (!inApp) {
      data.mask.contents().filter(function() {
        return this.nodeType === 3;
      }).remove();
    }

    // Run first render
    render(i, el);
  }

  function configure(data) {
    var config = {};

    config.crossOver = 0;

    // Set config options from data attributes
    config.animation = data.el.attr('data-animation') || 'slide';
    if (config.animation == 'outin') {
      config.animation = 'cross';
      config.crossOver = 0.5;
    }
    config.easing = data.el.attr('data-easing') || 'ease';

    var duration = data.el.attr('data-duration');
    config.duration = duration != null ? +duration : 500;

    if (+data.el.attr('data-infinite')) config.infinite = true;

    if (+data.el.attr('data-hide-arrows')) {
      config.hideArrows = true;
    } else if (data.config.hideArrows) {
      data.left.show();
      data.right.show();
    }

    if (+data.el.attr('data-autoplay')) {
      config.autoplay = true;
      config.delay = +data.el.attr('data-delay') || 2000;
      config.timerMax = +data.el.attr('data-autoplay-limit');
      // Disable timer on first touch or mouse down
      var touchEvents = 'mousedown' + namespace + ' touchstart' + namespace;
      if (!designer) data.el.off(touchEvents).one(touchEvents, function() {
        stopTimer(data);
      });
    }

    // Use edge buffer to help calculate page count
    var arrowWidth = data.right.width();
    config.edge = arrowWidth ? arrowWidth + 40 : 100;

    // Store config in data
    data.config = config;
  }

  function previous(data) {
    return function(evt) {
      change(data, { index: data.index - 1, vector: -1 });
    };
  }

  function next(data) {
    return function(evt) {
      change(data, { index: data.index + 1, vector: 1 });
    };
  }

  function select(data, value) {
    // Select page based on slide element index
    var found = null;
    if (value === data.slides.length) {
      init(); layout(data); // Rebuild and find new slides
    }
    _.each(data.anchors, function(anchor, index) {
      $(anchor.els).each(function(i, el) {
        if ($(el).index() === value) found = index;
      });
    });
    if (found != null) change(data, { index: found, immediate: true });
  }

  function startTimer(data) {
    stopTimer(data);
    var config = data.config;
    var timerMax = config.timerMax;
    if (timerMax && data.timerCount++ > timerMax) return;
    data.timerId = window.setTimeout(function() {
      if (data.timerId == null || designer) return;
      next(data)();
      startTimer(data);
    }, config.delay);
  }

  function stopTimer(data) {
    window.clearTimeout(data.timerId);
    data.timerId = null;
  }

  function handler(data) {
    return function(evt, options) {
      options = options || {};

      // Designer settings
      if (designer && evt.type == 'setting') {
        if (options.select == 'prev') return previous(data)();
        if (options.select == 'next') return next(data)();
        configure(data);
        layout(data);
        if (options.select == null) return;
        select(data, options.select);
        return;
      }

      // Swipe event
      if (evt.type == 'swipe') {
        if (Webflow.env('editor')) return;
        if (options.direction == 'left') return next(data)();
        if (options.direction == 'right') return previous(data)();
        return;
      }

      // Page buttons
      if (data.nav.has(evt.target).length) {
        change(data, { index: $(evt.target).index() });
      }
    };
  }

  function change(data, options) {
    options = options || {};
    var config = data.config;
    var anchors = data.anchors;

    // Set new index
    data.previous = data.index;
    var index = options.index;
    var shift = {};
    if (index < 0) {
      index = anchors.length-1;
      if (config.infinite) {
        // Shift first slide to the end
        shift.x = -data.endX;
        shift.from = 0;
        shift.to = anchors[0].width;
      }
    } else if (index >= anchors.length) {
      index = 0;
      if (config.infinite) {
        // Shift last slide to the start
        shift.x = anchors[anchors.length-1].width;
        shift.from = -anchors[anchors.length-1].x;
        shift.to = shift.from - shift.x;
      }
    }
    data.index = index;

    // Select page nav
    var active = data.nav.children().eq(data.index).addClass('w-active');
    data.nav.children().not(active).removeClass('w-active');

    // Hide arrows
    if (config.hideArrows) {
      data.index === anchors.length-1 ? data.right.hide() : data.right.show();
      data.index === 0 ? data.left.hide() : data.left.show();
    }

    // Get page offset from anchors
    var lastOffsetX = data.offsetX || 0;
    var offsetX = data.offsetX = -anchors[data.index].x;
    var resetConfig = { x: offsetX, opacity: 1, visibility: '' };

    // Transition slides
    var targets = $(anchors[data.index].els);
    var previous = $(anchors[data.previous] && anchors[data.previous].els);
    var others = data.slides.not(targets);
    var animation = config.animation;
    var easing = config.easing;
    var duration = Math.round(config.duration);
    var vector = options.vector || (data.index > data.previous ? 1 : -1);
    var fadeRule = 'opacity ' + duration + 'ms ' + easing;
    var slideRule = 'transform ' + duration + 'ms ' + easing;

    // Trigger IX events
    if (!designer) {
      targets.each(ix.intro);
      others.each(ix.outro);
    }

    // Set immediately after layout changes (but not during redraw)
    if (options.immediate && !redraw) {
      tram(targets).set(resetConfig);
      resetOthers();
      return;
    }

    // Exit early if index is unchanged
    if (data.index == data.previous) return;

    // Cross Fade / Out-In
    if (animation == 'cross') {
      var reduced = Math.round(duration - duration * config.crossOver);
      var wait = Math.round(duration - reduced);
      fadeRule = 'opacity ' + reduced + 'ms ' + easing;
      tram(previous)
        .set({ visibility: '' })
        .add(fadeRule)
        .start({ opacity: 0 });
      tram(targets)
        .set({ visibility: '', x: offsetX, opacity: 0, zIndex: data.depth++ })
        .add(fadeRule)
        .wait(wait)
        .then({ opacity: 1 })
        .then(resetOthers);
      return;
    }

    // Fade Over
    if (animation == 'fade') {
      tram(previous)
        .set({ visibility: '' })
        .stop();
      tram(targets)
        .set({ visibility: '', x: offsetX, opacity: 0, zIndex: data.depth++ })
        .add(fadeRule)
        .start({ opacity: 1 })
        .then(resetOthers);
      return;
    }

    // Slide Over
    if (animation == 'over') {
      resetConfig = { x: data.endX };
      tram(previous)
        .set({ visibility: '' })
        .stop();
      tram(targets)
        .set({ visibility: '', zIndex: data.depth++, x: offsetX + anchors[data.index].width * vector })
        .add(slideRule)
        .start({ x: offsetX })
        .then(resetOthers);
      return;
    }

    // Slide - infinite scroll
    if (config.infinite && shift.x) {
      tram(data.slides.not(previous))
        .set({ visibility: '', x: shift.x })
        .add(slideRule)
        .start({ x: offsetX });
      tram(previous)
        .set({ visibility: '', x: shift.from })
        .add(slideRule)
        .start({ x: shift.to });
      data.shifted = previous;

    } else {
      if (config.infinite && data.shifted) {
        tram(data.shifted).set({ visibility: '', x: lastOffsetX });
        data.shifted = null;
      }

      // Slide - basic scroll
      tram(data.slides)
        .set({ visibility: '' })
        .add(slideRule)
        .start({ x: offsetX });
    }

    // Helper to move others out of view
    function resetOthers() {
      var targets = $(anchors[data.index].els);
      var others = data.slides.not(targets);
      if (animation != 'slide') resetConfig.visibility = 'hidden';
      tram(others).set(resetConfig);
    }
  }

  function render(i, el) {
    var data = $.data(el, namespace);
    if (maskChanged(data)) return layout(data);
    if (designer && slidesChanged(data)) layout(data);
  }

  function layout(data) {
    // Determine page count from width of slides
    var pages = 1;
    var offset = 0;
    var anchor = 0;
    var width = 0;
    var maskWidth = data.maskWidth;
    var threshold = maskWidth - data.config.edge;
    if (threshold < 0) threshold = 0;
    data.anchors = [{ els: [], x: 0, width: 0 }];
    data.slides.each(function(i, el) {
      if (anchor - offset > threshold) {
        pages++;
        offset += maskWidth;
        // Store page anchor for transition
        data.anchors[pages-1] = { els: [], x: anchor, width: 0 };
      }
      // Set next anchor using current width + margin
      width = $(el).outerWidth(true);
      anchor += width;
      data.anchors[pages-1].width += width;
      data.anchors[pages-1].els.push(el);
    });
    data.endX = anchor;

    // Build dots if nav exists and needs updating
    if (designer) data.pages = null;
    if (data.nav.length && data.pages !== pages){
      data.pages = pages;
      buildNav(data);
    }

    // Make sure index is still within range and call change handler
    var index = data.index;
    if (index >= pages) index = pages-1;
    change(data, { immediate: true, index: index });
  }

  function buildNav(data) {
    var dots = [];
    var $dot;
    var spacing = data.el.attr('data-nav-spacing');
    if (spacing) spacing = parseFloat(spacing) + 'px';
    for (var i=0; i<data.pages; i++) {
      $dot = $(dot);
      if (data.nav.hasClass('w-num')) $dot.text(i+1);
      if (spacing != null) $dot.css({
        'margin-left': spacing,
        'margin-right': spacing
      });
      dots.push($dot);
    }
    data.nav.empty().append(dots);
  }

  function maskChanged(data) {
    var maskWidth = data.mask.width();
    if (data.maskWidth !== maskWidth) {
      data.maskWidth = maskWidth;
      return true;
    }
    return false;
  }

  function slidesChanged(data) {
    var slidesWidth = 0;
    data.slides.each(function(i, el) {
      slidesWidth += $(el).outerWidth(true);
    });
    if (data.slidesWidth !== slidesWidth) {
      data.slidesWidth = slidesWidth;
      return true;
    }
    return false;
  }

  // Export module
  return api;
};

},{"./webflow-lib":7}],14:[function(require,module,exports){
'use strict';

/**
 * Webflow: Tabs component
 */

var Webflow = require('./webflow-lib');

module.exports = function($, _) {
  var api = {};
  var tram = $.tram;
  var $win = $(window);
  var $doc = $(document);
  var $tabs;
  var design;
  var env = Webflow.env;
  var safari = env.safari;
  var inApp = env();
  var tabAttr = 'data-w-tab';
  var namespace = '.w-tabs';
  var linkCurrent = 'w--current';
  var tabActive = 'w--tab-active';
  var ix = Webflow.ixEvents();

  // -----------------------------------
  // Module methods

  api.ready = api.design = api.preview = init;

  // -----------------------------------
  // Private methods

  function init() {
    design = inApp && Webflow.env('design');

    // Find all instances on the page
    $tabs = $doc.find(namespace);
    if (!$tabs.length) return;
    $tabs.each(build);
  }

  function build(i, el) {
    var $el = $(el);

    // Store state in data
    var data = $.data(el, namespace);
    if (!data) data = $.data(el, namespace, { el: $el, config: {} });
    data.current = null;
    data.menu = $el.children('.w-tab-menu');
    data.links = data.menu.children('.w-tab-link');
    data.content = $el.children('.w-tab-content');
    data.panes = data.content.children('.w-tab-pane');

    // Remove old events
    data.el.off(namespace);
    data.links.off(namespace);

    // Set config from data attributes
    configure(data);

    // Wire up events when not in design mode
    if (!design) {
      data.links.on('click' + namespace, linkSelect(data));

      // Trigger first intro event from current tab
      var $link = data.links.filter('.' + linkCurrent);
      var tab = $link.attr(tabAttr);
      tab && changeTab(data, { tab: tab, immediate: true });
    }
  }

  function configure(data) {
    var config = {};
    var old = data.config || {};

    // Set config options from data attributes
    config.easing = data.el.attr('data-easing') || 'ease';

    var intro = +data.el.attr('data-duration-in');
    intro = config.intro = intro === intro ? intro : 0;

    var outro = +data.el.attr('data-duration-out');
    outro = config.outro = outro === outro ? outro : 0;

    config.immediate = !intro && !outro;

    // Store config in data
    data.config = config;
  }

  function linkSelect(data) {
    return function(evt) {
      var tab = evt.currentTarget.getAttribute(tabAttr);
      tab && changeTab(data, { tab: tab });
    };
  }

  function changeTab(data, options) {
    options = options || {};

    var config = data.config;
    var easing = config.easing;
    var tab = options.tab;

    // Don't select the same tab twice
    if (tab === data.current) return;
    data.current = tab;

    // Select the current link
    data.links.each(function(i, el) {
      var $el = $(el);
      if (el.getAttribute(tabAttr) === tab) $el.addClass(linkCurrent).each(ix.intro);
      else if ($el.hasClass(linkCurrent)) $el.removeClass(linkCurrent).each(ix.outro);
    });

    // Find the new tab panes and keep track of previous
    var targets = [];
    var previous = [];
    data.panes.each(function(i, el) {
      var $el = $(el);
      if (el.getAttribute(tabAttr) === tab) {
        targets.push(el);
      } else if ($el.hasClass(tabActive)) {
        previous.push(el);
      }
    });

    var $targets = $(targets);
    var $previous = $(previous);

    // Switch tabs immediately and bypass transitions
    if (options.immediate || config.immediate) {
      $targets.addClass(tabActive).each(ix.intro);
      $previous.removeClass(tabActive);
      Webflow.redraw.up();
      return;
    }

    // Fade out the currently active tab before intro
    if ($previous.length && config.outro) {
      $previous.each(ix.outro);
      tram($previous)
        .add('opacity ' + config.outro + 'ms ' + easing, { fallback: safari })
        .start({ opacity: 0 })
        .then(intro);
    } else {
      // Skip the outro and play intro
      intro();
    }

    // Fade in the new target
    function intro() {
      // Clear previous active class + inline style
      $previous.removeClass(tabActive).removeAttr('style');

      // Add active class to new target
      $targets.addClass(tabActive).each(ix.intro);
      Webflow.redraw.up();

      // Set opacity immediately if intro is zero
      if (!config.intro) return tram($targets).set({ opacity: 1 });

      // Otherwise fade in opacity
      tram($targets)
        .set({ opacity: 0 })
        .redraw()
        .add('opacity ' + config.intro + 'ms ' + easing, { fallback: safari })
        .start({ opacity: 1 });
    }
  }

  // Export module
  return api;
};

},{"./webflow-lib":7}],15:[function(require,module,exports){
'use strict';

/**
 * Webflow: Touch events
 */

module.exports = function($, _) {
  var api = {};
  var fallback = !document.addEventListener;
  var getSelection = window.getSelection;

  // Fallback to click events in old IE
  if (fallback) {
    $.event.special.tap = { bindType: 'click', delegateType: 'click' };
  }

  api.init = function(el) {
    if (fallback) return null;
    el = typeof el === 'string' ? $(el).get(0) : el;
    return el ? new Touch(el) : null;
  };

  function Touch(el) {
    var active = false;
    var dirty = false;
    var useTouch = false;
    var thresholdX = Math.min(Math.round(window.innerWidth * 0.04), 40);
    var startX, startY, lastX;

    el.addEventListener('touchstart', start, false);
    el.addEventListener('touchmove', move, false);
    el.addEventListener('touchend', end, false);
    el.addEventListener('touchcancel', cancel, false);
    el.addEventListener('mousedown', start, false);
    el.addEventListener('mousemove', move, false);
    el.addEventListener('mouseup', end, false);
    el.addEventListener('mouseout', cancel, false);

    function start(evt) {
      // We don’t handle multi-touch events yet.
      var touches = evt.touches;
      if (touches && touches.length > 1) {
        return;
      }

      active = true;
      dirty = false;

      if (touches) {
        useTouch = true;
        startX = touches[0].clientX;
        startY = touches[0].clientY;
      } else {
        startX = evt.clientX;
        startY = evt.clientY;
      }

      lastX = startX;
    }

    function move(evt) {
      if (!active) return;

      if (useTouch && evt.type === 'mousemove') {
        evt.preventDefault();
        evt.stopPropagation();
        return;
      }

      var touches = evt.touches;
      var x = touches ? touches[0].clientX : evt.clientX;
      var y = touches ? touches[0].clientY : evt.clientY;

      var velocityX = x - lastX;
      lastX = x;

      // Allow swipes while pointer is down, but prevent them during text selection
      if (Math.abs(velocityX) > thresholdX && getSelection && getSelection() + '' === '') {
        triggerEvent('swipe', evt, { direction: velocityX > 0 ? 'right' : 'left' });
        cancel();
      }

      // If pointer moves more than 10px flag to cancel tap
      if (Math.abs(x - startX) > 10 || Math.abs(y - startY) > 10) {
        dirty = true;
      }
    }

    function end(evt) {
      if (!active) return;
      active = false;

      if (useTouch && evt.type === 'mouseup') {
        evt.preventDefault();
        evt.stopPropagation();
        useTouch = false;
        return;
      }

      if (!dirty) triggerEvent('tap', evt);
    }

    function cancel(evt) {
      active = false;
    }

    function destroy() {
      el.removeEventListener('touchstart', start, false);
      el.removeEventListener('touchmove', move, false);
      el.removeEventListener('touchend', end, false);
      el.removeEventListener('touchcancel', cancel, false);
      el.removeEventListener('mousedown', start, false);
      el.removeEventListener('mousemove', move, false);
      el.removeEventListener('mouseup', end, false);
      el.removeEventListener('mouseout', cancel, false);
      el = null;
    }

    // Public instance methods
    this.destroy = destroy;
  }

  // Wrap native event to supoprt preventdefault + stopPropagation
  function triggerEvent(type, evt, data) {
    var newEvent = $.Event(type, { originalEvent: evt });
    $(evt.target).trigger(newEvent, data);
  }

  // Listen for touch events on all nodes by default.
  api.instance = api.init(document);

  // Export module
  return api;
};

},{}],16:[function(require,module,exports){
/*!
 * tram.js v0.8.1-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
window.tram=function(a){function b(a,b){var c=new L.Bare;return c.init(a,b)}function c(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}function d(a){var b=parseInt(a.slice(1),16),c=b>>16&255,d=b>>8&255,e=255&b;return[c,d,e]}function e(a,b,c){return"#"+(1<<24|a<<16|b<<8|c).toString(16).slice(1)}function f(){}function g(a,b){_("Type warning: Expected: ["+a+"] Got: ["+typeof b+"] "+b)}function h(a,b,c){_("Units do not match ["+a+"]: "+b+", "+c)}function i(a,b,c){if(void 0!==b&&(c=b),void 0===a)return c;var d=c;return Z.test(a)||!$.test(a)?d=parseInt(a,10):$.test(a)&&(d=1e3*parseFloat(a)),0>d&&(d=0),d===d?d:c}function j(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}var k=function(a,b,c){function d(a){return"object"==typeof a}function e(a){return"function"==typeof a}function f(){}function g(h,i){function j(){var a=new k;return e(a.init)&&a.init.apply(a,arguments),a}function k(){}i===c&&(i=h,h=Object),j.Bare=k;var l,m=f[a]=h[a],n=k[a]=j[a]=new f;return n.constructor=j,j.mixin=function(b){return k[a]=j[a]=g(j,b)[a],j},j.open=function(a){if(l={},e(a)?l=a.call(j,n,m,j,h):d(a)&&(l=a),d(l))for(var c in l)b.call(l,c)&&(n[c]=l[c]);return e(n.init)||(n.init=h),j},j.open(i)}return g}("prototype",{}.hasOwnProperty),l={ease:["ease",function(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(-2.75*f*e+11*e*e+-15.5*f+8*e+.25*a)}],"ease-in":["ease-in",function(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(-1*f*e+3*e*e+-3*f+2*e)}],"ease-out":["ease-out",function(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(.3*f*e+-1.6*e*e+2.2*f+-1.8*e+1.9*a)}],"ease-in-out":["ease-in-out",function(a,b,c,d){var e=(a/=d)*a,f=e*a;return b+c*(2*f*e+-5*e*e+2*f+2*e)}],linear:["linear",function(a,b,c,d){return c*a/d+b}],"ease-in-quad":["cubic-bezier(0.550, 0.085, 0.680, 0.530)",function(a,b,c,d){return c*(a/=d)*a+b}],"ease-out-quad":["cubic-bezier(0.250, 0.460, 0.450, 0.940)",function(a,b,c,d){return-c*(a/=d)*(a-2)+b}],"ease-in-out-quad":["cubic-bezier(0.455, 0.030, 0.515, 0.955)",function(a,b,c,d){return(a/=d/2)<1?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b}],"ease-in-cubic":["cubic-bezier(0.550, 0.055, 0.675, 0.190)",function(a,b,c,d){return c*(a/=d)*a*a+b}],"ease-out-cubic":["cubic-bezier(0.215, 0.610, 0.355, 1)",function(a,b,c,d){return c*((a=a/d-1)*a*a+1)+b}],"ease-in-out-cubic":["cubic-bezier(0.645, 0.045, 0.355, 1)",function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a+b:c/2*((a-=2)*a*a+2)+b}],"ease-in-quart":["cubic-bezier(0.895, 0.030, 0.685, 0.220)",function(a,b,c,d){return c*(a/=d)*a*a*a+b}],"ease-out-quart":["cubic-bezier(0.165, 0.840, 0.440, 1)",function(a,b,c,d){return-c*((a=a/d-1)*a*a*a-1)+b}],"ease-in-out-quart":["cubic-bezier(0.770, 0, 0.175, 1)",function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a+b:-c/2*((a-=2)*a*a*a-2)+b}],"ease-in-quint":["cubic-bezier(0.755, 0.050, 0.855, 0.060)",function(a,b,c,d){return c*(a/=d)*a*a*a*a+b}],"ease-out-quint":["cubic-bezier(0.230, 1, 0.320, 1)",function(a,b,c,d){return c*((a=a/d-1)*a*a*a*a+1)+b}],"ease-in-out-quint":["cubic-bezier(0.860, 0, 0.070, 1)",function(a,b,c,d){return(a/=d/2)<1?c/2*a*a*a*a*a+b:c/2*((a-=2)*a*a*a*a+2)+b}],"ease-in-sine":["cubic-bezier(0.470, 0, 0.745, 0.715)",function(a,b,c,d){return-c*Math.cos(a/d*(Math.PI/2))+c+b}],"ease-out-sine":["cubic-bezier(0.390, 0.575, 0.565, 1)",function(a,b,c,d){return c*Math.sin(a/d*(Math.PI/2))+b}],"ease-in-out-sine":["cubic-bezier(0.445, 0.050, 0.550, 0.950)",function(a,b,c,d){return-c/2*(Math.cos(Math.PI*a/d)-1)+b}],"ease-in-expo":["cubic-bezier(0.950, 0.050, 0.795, 0.035)",function(a,b,c,d){return 0===a?b:c*Math.pow(2,10*(a/d-1))+b}],"ease-out-expo":["cubic-bezier(0.190, 1, 0.220, 1)",function(a,b,c,d){return a===d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b}],"ease-in-out-expo":["cubic-bezier(1, 0, 0, 1)",function(a,b,c,d){return 0===a?b:a===d?b+c:(a/=d/2)<1?c/2*Math.pow(2,10*(a-1))+b:c/2*(-Math.pow(2,-10*--a)+2)+b}],"ease-in-circ":["cubic-bezier(0.600, 0.040, 0.980, 0.335)",function(a,b,c,d){return-c*(Math.sqrt(1-(a/=d)*a)-1)+b}],"ease-out-circ":["cubic-bezier(0.075, 0.820, 0.165, 1)",function(a,b,c,d){return c*Math.sqrt(1-(a=a/d-1)*a)+b}],"ease-in-out-circ":["cubic-bezier(0.785, 0.135, 0.150, 0.860)",function(a,b,c,d){return(a/=d/2)<1?-c/2*(Math.sqrt(1-a*a)-1)+b:c/2*(Math.sqrt(1-(a-=2)*a)+1)+b}],"ease-in-back":["cubic-bezier(0.600, -0.280, 0.735, 0.045)",function(a,b,c,d,e){return void 0===e&&(e=1.70158),c*(a/=d)*a*((e+1)*a-e)+b}],"ease-out-back":["cubic-bezier(0.175, 0.885, 0.320, 1.275)",function(a,b,c,d,e){return void 0===e&&(e=1.70158),c*((a=a/d-1)*a*((e+1)*a+e)+1)+b}],"ease-in-out-back":["cubic-bezier(0.680, -0.550, 0.265, 1.550)",function(a,b,c,d,e){return void 0===e&&(e=1.70158),(a/=d/2)<1?c/2*a*a*(((e*=1.525)+1)*a-e)+b:c/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+b}]},m={"ease-in-back":"cubic-bezier(0.600, 0, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.320, 1)","ease-in-out-back":"cubic-bezier(0.680, 0, 0.265, 1)"},n=document,o=window,p="bkwld-tram",q=/[\-\.0-9]/g,r=/[A-Z]/,s="number",t=/^(rgb|#)/,u=/(em|cm|mm|in|pt|pc|px)$/,v=/(em|cm|mm|in|pt|pc|px|%)$/,w=/(deg|rad|turn)$/,x="unitless",y=/(all|none) 0s ease 0s/,z=/^(width|height)$/,A=" ",B=n.createElement("a"),C=["Webkit","Moz","O","ms"],D=["-webkit-","-moz-","-o-","-ms-"],E=function(a){if(a in B.style)return{dom:a,css:a};var b,c,d="",e=a.split("-");for(b=0;b<e.length;b++)d+=e[b].charAt(0).toUpperCase()+e[b].slice(1);for(b=0;b<C.length;b++)if(c=C[b]+d,c in B.style)return{dom:c,css:D[b]+a}},F=b.support={bind:Function.prototype.bind,transform:E("transform"),transition:E("transition"),backface:E("backface-visibility"),timing:E("transition-timing-function")};if(F.transition){var G=F.timing.dom;if(B.style[G]=l["ease-in-back"][0],!B.style[G])for(var H in m)l[H][0]=m[H]}var I=b.frame=function(){var a=o.requestAnimationFrame||o.webkitRequestAnimationFrame||o.mozRequestAnimationFrame||o.oRequestAnimationFrame||o.msRequestAnimationFrame;return a&&F.bind?a.bind(o):function(a){o.setTimeout(a,16)}}(),J=b.now=function(){var a=o.performance,b=a&&(a.now||a.webkitNow||a.msNow||a.mozNow);return b&&F.bind?b.bind(a):Date.now||function(){return+new Date}}(),K=k(function(b){function d(a,b){var c=j((""+a).split(A)),d=c[0];b=b||{};var e=X[d];if(!e)return _("Unsupported property: "+d);if(!b.weak||!this.props[d]){var f=e[0],g=this.props[d];return g||(g=this.props[d]=new f.Bare),g.init(this.$el,c,e,b),g}}function e(a,b,c){if(a){var e=typeof a;if(b||(this.timer&&this.timer.destroy(),this.queue=[],this.active=!1),"number"==e&&b)return this.timer=new R({duration:a,context:this,complete:h}),void(this.active=!0);if("string"==e&&b){switch(a){case"hide":n.call(this);break;case"stop":k.call(this);break;case"redraw":o.call(this);break;default:d.call(this,a,c&&c[1])}return h.call(this)}if("function"==e)return void a.call(this,this);if("object"==e){var f=0;t.call(this,a,function(a,b){a.span>f&&(f=a.span),a.stop(),a.animate(b)},function(a){"wait"in a&&(f=i(a.wait,0))}),s.call(this),f>0&&(this.timer=new R({duration:f,context:this}),this.active=!0,b&&(this.timer.complete=h));var g=this,j=!1,l={};I(function(){t.call(g,a,function(a){a.active&&(j=!0,l[a.name]=a.nextStyle)}),j&&g.$el.css(l)})}}}function f(a){a=i(a,0),this.active?this.queue.push({options:a}):(this.timer=new R({duration:a,context:this,complete:h}),this.active=!0)}function g(a){return this.active?(this.queue.push({options:a,args:arguments}),void(this.timer.complete=h)):_("No active transition timer. Use start() or wait() before then().")}function h(){if(this.timer&&this.timer.destroy(),this.active=!1,this.queue.length){var a=this.queue.shift();e.call(this,a.options,!0,a.args)}}function k(a){this.timer&&this.timer.destroy(),this.queue=[],this.active=!1;var b;"string"==typeof a?(b={},b[a]=1):b="object"==typeof a&&null!=a?a:this.props,t.call(this,b,u),s.call(this)}function l(a){k.call(this,a),t.call(this,a,v,w)}function m(a){"string"!=typeof a&&(a="block"),this.el.style.display=a}function n(){k.call(this),this.el.style.display="none"}function o(){this.el.offsetHeight}function q(){k.call(this),a.removeData(this.el,p),this.$el=this.el=null}function s(){var a,b,c=[];this.upstream&&c.push(this.upstream);for(a in this.props)b=this.props[a],b.active&&c.push(b.string);c=c.join(","),this.style!==c&&(this.style=c,this.el.style[F.transition.dom]=c)}function t(a,b,e){var f,g,h,i,j=b!==u,k={};for(f in a)h=a[f],f in Y?(k.transform||(k.transform={}),k.transform[f]=h):(r.test(f)&&(f=c(f)),f in X?k[f]=h:(i||(i={}),i[f]=h));for(f in k){if(h=k[f],g=this.props[f],!g){if(!j)continue;g=d.call(this,f)}b.call(this,g,h)}e&&i&&e.call(this,i)}function u(a){a.stop()}function v(a,b){a.set(b)}function w(a){this.$el.css(a)}function x(a,c){b[a]=function(){return this.children?z.call(this,c,arguments):(this.el&&c.apply(this,arguments),this)}}function z(a,b){var c,d=this.children.length;for(c=0;d>c;c++)a.apply(this.children[c],b);return this}b.init=function(b){if(this.$el=a(b),this.el=this.$el[0],this.props={},this.queue=[],this.style="",this.active=!1,T.keepInherited&&!T.fallback){var c=V(this.el,"transition");c&&!y.test(c)&&(this.upstream=c)}F.backface&&T.hideBackface&&U(this.el,F.backface.css,"hidden")},x("add",d),x("start",e),x("wait",f),x("then",g),x("next",h),x("stop",k),x("set",l),x("show",m),x("hide",n),x("redraw",o),x("destroy",q)}),L=k(K,function(b){function c(b,c){var d=a.data(b,p)||a.data(b,p,new K.Bare);return d.el||d.init(b),c?d.start(c):d}b.init=function(b,d){var e=a(b);if(!e.length)return this;if(1===e.length)return c(e[0],d);var f=[];return e.each(function(a,b){f.push(c(b,d))}),this.children=f,this}}),M=k(function(a){function b(){var a=this.get();this.update("auto");var b=this.get();return this.update(a),b}function c(a,b,c){return void 0!==b&&(c=b),a in l?a:c}function d(a){var b=/rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(a);return(b?e(b[1],b[2],b[3]):a).replace(/#(\w)(\w)(\w)$/,"#$1$1$2$2$3$3")}var f={duration:500,ease:"ease",delay:0};a.init=function(a,b,d,e){this.$el=a,this.el=a[0];var g=b[0];d[2]&&(g=d[2]),W[g]&&(g=W[g]),this.name=g,this.type=d[1],this.duration=i(b[1],this.duration,f.duration),this.ease=c(b[2],this.ease,f.ease),this.delay=i(b[3],this.delay,f.delay),this.span=this.duration+this.delay,this.active=!1,this.nextStyle=null,this.auto=z.test(this.name),this.unit=e.unit||this.unit||T.defaultUnit,this.angle=e.angle||this.angle||T.defaultAngle,T.fallback||e.fallback?this.animate=this.fallback:(this.animate=this.transition,this.string=this.name+A+this.duration+"ms"+("ease"!=this.ease?A+l[this.ease][0]:"")+(this.delay?A+this.delay+"ms":""))},a.set=function(a){a=this.convert(a,this.type),this.update(a),this.redraw()},a.transition=function(a){this.active=!0,a=this.convert(a,this.type),this.auto&&("auto"==this.el.style[this.name]&&(this.update(this.get()),this.redraw()),"auto"==a&&(a=b.call(this))),this.nextStyle=a},a.fallback=function(a){var c=this.el.style[this.name]||this.convert(this.get(),this.type);a=this.convert(a,this.type),this.auto&&("auto"==c&&(c=this.convert(this.get(),this.type)),"auto"==a&&(a=b.call(this))),this.tween=new Q({from:c,to:a,duration:this.duration,delay:this.delay,ease:this.ease,update:this.update,context:this})},a.get=function(){return V(this.el,this.name)},a.update=function(a){U(this.el,this.name,a)},a.stop=function(){(this.active||this.nextStyle)&&(this.active=!1,this.nextStyle=null,U(this.el,this.name,this.get()));var a=this.tween;a&&a.context&&a.destroy()},a.convert=function(a,b){if("auto"==a&&this.auto)return a;var c,e="number"==typeof a,f="string"==typeof a;switch(b){case s:if(e)return a;if(f&&""===a.replace(q,""))return+a;c="number(unitless)";break;case t:if(f){if(""===a&&this.original)return this.original;if(b.test(a))return"#"==a.charAt(0)&&7==a.length?a:d(a)}c="hex or rgb string";break;case u:if(e)return a+this.unit;if(f&&b.test(a))return a;c="number(px) or string(unit)";break;case v:if(e)return a+this.unit;if(f&&b.test(a))return a;c="number(px) or string(unit or %)";break;case w:if(e)return a+this.angle;if(f&&b.test(a))return a;c="number(deg) or string(angle)";break;case x:if(e)return a;if(f&&v.test(a))return a;c="number(unitless) or string(unit or %)"}return g(c,a),a},a.redraw=function(){this.el.offsetHeight}}),N=k(M,function(a,b){a.init=function(){b.init.apply(this,arguments),this.original||(this.original=this.convert(this.get(),t))}}),O=k(M,function(a,b){a.init=function(){b.init.apply(this,arguments),this.animate=this.fallback},a.get=function(){return this.$el[this.name]()},a.update=function(a){this.$el[this.name](a)}}),P=k(M,function(a,b){function c(a,b){var c,d,e,f,g;for(c in a)f=Y[c],e=f[0],d=f[1]||c,g=this.convert(a[c],e),b.call(this,d,g,e)}a.init=function(){b.init.apply(this,arguments),this.current||(this.current={},Y.perspective&&T.perspective&&(this.current.perspective=T.perspective,U(this.el,this.name,this.style(this.current)),this.redraw()))},a.set=function(a){c.call(this,a,function(a,b){this.current[a]=b}),U(this.el,this.name,this.style(this.current)),this.redraw()},a.transition=function(a){var b=this.values(a);this.tween=new S({current:this.current,values:b,duration:this.duration,delay:this.delay,ease:this.ease});var c,d={};for(c in this.current)d[c]=c in b?b[c]:this.current[c];this.active=!0,this.nextStyle=this.style(d)},a.fallback=function(a){var b=this.values(a);this.tween=new S({current:this.current,values:b,duration:this.duration,delay:this.delay,ease:this.ease,update:this.update,context:this})},a.update=function(){U(this.el,this.name,this.style(this.current))},a.style=function(a){var b,c="";for(b in a)c+=b+"("+a[b]+") ";return c},a.values=function(a){var b,d={};return c.call(this,a,function(a,c,e){d[a]=c,void 0===this.current[a]&&(b=0,~a.indexOf("scale")&&(b=1),this.current[a]=this.convert(b,e))}),d}}),Q=k(function(b){function c(a){1===n.push(a)&&I(g)}function g(){var a,b,c,d=n.length;if(d)for(I(g),b=J(),a=d;a--;)c=n[a],c&&c.render(b)}function i(b){var c,d=a.inArray(b,n);d>=0&&(c=n.slice(d+1),n.length=d,c.length&&(n=n.concat(c)))}function j(a){return Math.round(a*o)/o}function k(a,b,c){return e(a[0]+c*(b[0]-a[0]),a[1]+c*(b[1]-a[1]),a[2]+c*(b[2]-a[2]))}var m={ease:l.ease[1],from:0,to:1};b.init=function(a){this.duration=a.duration||0,this.delay=a.delay||0;var b=a.ease||m.ease;l[b]&&(b=l[b][1]),"function"!=typeof b&&(b=m.ease),this.ease=b,this.update=a.update||f,this.complete=a.complete||f,this.context=a.context||this,this.name=a.name;var c=a.from,d=a.to;void 0===c&&(c=m.from),void 0===d&&(d=m.to),this.unit=a.unit||"","number"==typeof c&&"number"==typeof d?(this.begin=c,this.change=d-c):this.format(d,c),this.value=this.begin+this.unit,this.start=J(),a.autoplay!==!1&&this.play()},b.play=function(){this.active||(this.start||(this.start=J()),this.active=!0,c(this))},b.stop=function(){this.active&&(this.active=!1,i(this))},b.render=function(a){var b,c=a-this.start;if(this.delay){if(c<=this.delay)return;c-=this.delay}if(c<this.duration){var d=this.ease(c,0,1,this.duration);return b=this.startRGB?k(this.startRGB,this.endRGB,d):j(this.begin+d*this.change),this.value=b+this.unit,void this.update.call(this.context,this.value)}b=this.endHex||this.begin+this.change,this.value=b+this.unit,this.update.call(this.context,this.value),this.complete.call(this.context),this.destroy()},b.format=function(a,b){if(b+="",a+="","#"==a.charAt(0))return this.startRGB=d(b),this.endRGB=d(a),this.endHex=a,this.begin=0,void(this.change=1);if(!this.unit){var c=b.replace(q,""),e=a.replace(q,"");c!==e&&h("tween",b,a),this.unit=c}b=parseFloat(b),a=parseFloat(a),this.begin=this.value=b,this.change=a-b},b.destroy=function(){this.stop(),this.context=null,this.ease=this.update=this.complete=f};var n=[],o=1e3}),R=k(Q,function(a){a.init=function(a){this.duration=a.duration||0,this.complete=a.complete||f,this.context=a.context,this.play()},a.render=function(a){var b=a-this.start;b<this.duration||(this.complete.call(this.context),this.destroy())}}),S=k(Q,function(a,b){a.init=function(a){this.context=a.context,this.update=a.update,this.tweens=[],this.current=a.current;var b,c;for(b in a.values)c=a.values[b],this.current[b]!==c&&this.tweens.push(new Q({name:b,from:this.current[b],to:c,duration:a.duration,delay:a.delay,ease:a.ease,autoplay:!1}));this.play()},a.render=function(a){var b,c,d=this.tweens.length,e=!1;for(b=d;b--;)c=this.tweens[b],c.context&&(c.render(a),this.current[c.name]=c.value,e=!0);return e?void(this.update&&this.update.call(this.context)):this.destroy()},a.destroy=function(){if(b.destroy.call(this),this.tweens){var a,c=this.tweens.length;for(a=c;a--;)this.tweens[a].destroy();this.tweens=null,this.current=null}}}),T=b.config={defaultUnit:"px",defaultAngle:"deg",keepInherited:!1,hideBackface:!1,perspective:"",fallback:!F.transition,agentTests:[]};b.fallback=function(a){if(!F.transition)return T.fallback=!0;T.agentTests.push("("+a+")");var b=new RegExp(T.agentTests.join("|"),"i");T.fallback=b.test(navigator.userAgent)},b.fallback("6.0.[2-5] Safari"),b.tween=function(a){return new Q(a)},b.delay=function(a,b,c){return new R({complete:b,duration:a,context:c})},a.fn.tram=function(a){return b.call(null,this,a)};var U=a.style,V=a.css,W={transform:F.transform&&F.transform.css},X={color:[N,t],background:[N,t,"background-color"],"outline-color":[N,t],"border-color":[N,t],"border-top-color":[N,t],"border-right-color":[N,t],"border-bottom-color":[N,t],"border-left-color":[N,t],"border-width":[M,u],"border-top-width":[M,u],"border-right-width":[M,u],"border-bottom-width":[M,u],"border-left-width":[M,u],"border-spacing":[M,u],"letter-spacing":[M,u],margin:[M,u],"margin-top":[M,u],"margin-right":[M,u],"margin-bottom":[M,u],"margin-left":[M,u],padding:[M,u],"padding-top":[M,u],"padding-right":[M,u],"padding-bottom":[M,u],"padding-left":[M,u],"outline-width":[M,u],opacity:[M,s],top:[M,v],right:[M,v],bottom:[M,v],left:[M,v],"font-size":[M,v],"text-indent":[M,v],"word-spacing":[M,v],width:[M,v],"min-width":[M,v],"max-width":[M,v],height:[M,v],"min-height":[M,v],"max-height":[M,v],"line-height":[M,x],"scroll-top":[O,s,"scrollTop"],"scroll-left":[O,s,"scrollLeft"]},Y={};F.transform&&(X.transform=[P],Y={x:[v,"translateX"],y:[v,"translateY"],rotate:[w],rotateX:[w],rotateY:[w],scale:[s],scaleX:[s],scaleY:[s],skew:[w],skewX:[w],skewY:[w]}),F.transform&&F.backface&&(Y.z=[v,"translateZ"],Y.rotateZ=[w],Y.scaleZ=[s],Y.perspective=[u]);var Z=/ms/,$=/s|\./,_=function(){var a="warn",b=window.console;return b&&b[a]?function(c){b[a](c)}:f}();return a.tram=b}(window.jQuery);

},{}],17:[function(require,module,exports){
'use strict';

/*jshint -W054 */

// Include tram for frame-throttling
var $ = window.$;
var tram = require('../plugins/tram-min') && $.tram;

/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
module.exports = (function() {
  var _ = {};

  // Current version.
  _.VERSION = '1.6.0-Webflow';

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    /* jshint shadow:true */
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Function (ahem) Functions
  // --------------------

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered once every
  // browser animation frame - using tram's requestAnimationFrame polyfill.
  _.throttle = function(func) {
    var wait, args, context;
    return function() {
      if (wait) return;
      wait = true;
      args = arguments;
      context = this;
      tram.frame(function() {
        wait = false;
        func.apply(context, args);
      });
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Object Functions
  // ----------------

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Utility Functions
  // -----------------

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Export underscore
  return _;
}());

},{"../plugins/tram-min":16}],18:[function(require,module,exports){
/*!
 * jQuery-ajaxTransport-XDomainRequest - v1.0.3
 * 2014-12-16 WEBFLOW - Removed UMD wrapper
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2014 Jason Moon (@JSONMOON)
 * @license MIT (/blob/master/LICENSE.txt)
 */
module.exports=function($){if($.support.cors||!$.ajaxTransport||!window.XDomainRequest){return}var httpRegEx=/^https?:\/\//i;var getOrPostRegEx=/^get|post$/i;var sameSchemeRegEx=new RegExp("^"+location.protocol,"i");$.ajaxTransport("* text html xml json",function(options,userOptions,jqXHR){if(!options.crossDomain||!options.async||!getOrPostRegEx.test(options.type)||!httpRegEx.test(options.url)||!sameSchemeRegEx.test(options.url)){return}var xdr=null;return{send:function(headers,complete){var postData="";var userType=(userOptions.dataType||"").toLowerCase();xdr=new XDomainRequest;if(/^\d+$/.test(userOptions.timeout)){xdr.timeout=userOptions.timeout}xdr.ontimeout=function(){complete(500,"timeout")};xdr.onload=function(){var allResponseHeaders="Content-Length: "+xdr.responseText.length+"\r\nContent-Type: "+xdr.contentType;var status={code:200,message:"success"};var responses={text:xdr.responseText};try{if(userType==="html"||/text\/html/i.test(xdr.contentType)){responses.html=xdr.responseText}else if(userType==="json"||userType!=="text"&&/\/json/i.test(xdr.contentType)){try{responses.json=$.parseJSON(xdr.responseText)}catch(e){status.code=500;status.message="parseerror"}}else if(userType==="xml"||userType!=="text"&&/\/xml/i.test(xdr.contentType)){var doc=new ActiveXObject("Microsoft.XMLDOM");doc.async=false;try{doc.loadXML(xdr.responseText)}catch(e){doc=undefined}if(!doc||!doc.documentElement||doc.getElementsByTagName("parsererror").length){status.code=500;status.message="parseerror";throw"Invalid XML: "+xdr.responseText}responses.xml=doc}}catch(parseMessage){throw parseMessage}finally{complete(status.code,status.message,responses,allResponseHeaders)}};xdr.onprogress=function(){};xdr.onerror=function(){complete(500,"error",{text:xdr.responseText})};if(userOptions.data){postData=$.type(userOptions.data)==="string"?userOptions.data:$.param(userOptions.data)}xdr.open(options.type,options.url);xdr.send(postData)},abort:function(){if(xdr){xdr.abort()}}}})}(window.jQuery);
},{}]},{},[1]);

/* INICIO JS DO MATERIALIZE CSS materialize.min.js */
/*!
 * Materialize v0.96.1 (http://materializecss.com)
 * Copyright 2014-2015 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin(2*(b*e-f)*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin(2*(b*e-f)*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=.3*e*1.5),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*h*Math.pow(2,10*(b-=1))*Math.sin(2*(b*e-f)*Math.PI/g)+c:h*Math.pow(2,-10*(b-=1))*Math.sin(2*(b*e-f)*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?7.5625*d*b*b+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}}),jQuery.extend(jQuery.easing,{easeInOutMaterial:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:d/4*((b-=2)*b*b+2)+c}}),!function(a){function b(a){var b=a.length,d=c.type(a);return"function"===d||c.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===d||0===b||"number"==typeof b&&b>0&&b-1 in a}if(!a.jQuery){var c=function(a,b){return new c.fn.init(a,b)};c.isWindow=function(a){return null!=a&&a==a.window},c.type=function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?e[g.call(a)]||"object":typeof a},c.isArray=Array.isArray||function(a){return"array"===c.type(a)},c.isPlainObject=function(a){var b;if(!a||"object"!==c.type(a)||a.nodeType||c.isWindow(a))return!1;try{if(a.constructor&&!f.call(a,"constructor")&&!f.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(d){return!1}for(b in a);return void 0===b||f.call(a,b)},c.each=function(a,c,d){var e,f=0,g=a.length,h=b(a);if(d){if(h)for(;g>f&&(e=c.apply(a[f],d),e!==!1);f++);else for(f in a)if(e=c.apply(a[f],d),e===!1)break}else if(h)for(;g>f&&(e=c.call(a[f],f,a[f]),e!==!1);f++);else for(f in a)if(e=c.call(a[f],f,a[f]),e===!1)break;return a},c.data=function(a,b,e){if(void 0===e){var f=a[c.expando],g=f&&d[f];if(void 0===b)return g;if(g&&b in g)return g[b]}else if(void 0!==b){var f=a[c.expando]||(a[c.expando]=++c.uuid);return d[f]=d[f]||{},d[f][b]=e,e}},c.removeData=function(a,b){var e=a[c.expando],f=e&&d[e];f&&c.each(b,function(a,b){delete f[b]})},c.extend=function(){var a,b,d,e,f,g,h=arguments[0]||{},i=1,j=arguments.length,k=!1;for("boolean"==typeof h&&(k=h,h=arguments[i]||{},i++),"object"!=typeof h&&"function"!==c.type(h)&&(h={}),i===j&&(h=this,i--);j>i;i++)if(null!=(f=arguments[i]))for(e in f)a=h[e],d=f[e],h!==d&&(k&&d&&(c.isPlainObject(d)||(b=c.isArray(d)))?(b?(b=!1,g=a&&c.isArray(a)?a:[]):g=a&&c.isPlainObject(a)?a:{},h[e]=c.extend(k,g,d)):void 0!==d&&(h[e]=d));return h},c.queue=function(a,d,e){function f(a,c){var d=c||[];return null!=a&&(b(Object(a))?!function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;)a[e++]=b[d++];if(c!==c)for(;void 0!==b[d];)a[e++]=b[d++];return a.length=e,a}(d,"string"==typeof a?[a]:a):[].push.call(d,a)),d}if(a){d=(d||"fx")+"queue";var g=c.data(a,d);return e?(!g||c.isArray(e)?g=c.data(a,d,f(e)):g.push(e),g):g||[]}},c.dequeue=function(a,b){c.each(a.nodeType?[a]:a,function(a,d){b=b||"fx";var e=c.queue(d,b),f=e.shift();"inprogress"===f&&(f=e.shift()),f&&("fx"===b&&e.unshift("inprogress"),f.call(d,function(){c.dequeue(d,b)}))})},c.fn=c.prototype={init:function(a){if(a.nodeType)return this[0]=a,this;throw new Error("Not a DOM node.")},offset:function(){var b=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:b.top+(a.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:b.left+(a.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function a(){for(var a=this.offsetParent||document;a&&"html"===!a.nodeType.toLowerCase&&"static"===a.style.position;)a=a.offsetParent;return a||document}var b=this[0],a=a.apply(b),d=this.offset(),e=/^(?:body|html)$/i.test(a.nodeName)?{top:0,left:0}:c(a).offset();return d.top-=parseFloat(b.style.marginTop)||0,d.left-=parseFloat(b.style.marginLeft)||0,a.style&&(e.top+=parseFloat(a.style.borderTopWidth)||0,e.left+=parseFloat(a.style.borderLeftWidth)||0),{top:d.top-e.top,left:d.left-e.left}}};var d={};c.expando="velocity"+(new Date).getTime(),c.uuid=0;for(var e={},f=e.hasOwnProperty,g=e.toString,h="Boolean Number String Function Array Date RegExp Object Error".split(" "),i=0;i<h.length;i++)e["[object "+h[i]+"]"]=h[i].toLowerCase();c.fn.init.prototype=c.fn,a.Velocity={Utilities:c}}}(window),function(a){"object"==typeof module&&"object"==typeof module.exports?module.exports=a():"function"==typeof define&&define.amd?define(a):a()}(function(){return function(a,b,c,d){function e(a){for(var b=-1,c=a?a.length:0,d=[];++b<c;){var e=a[b];e&&d.push(e)}return d}function f(a){return p.isWrapped(a)?a=[].slice.call(a):p.isNode(a)&&(a=[a]),a}function g(a){var b=m.data(a,"velocity");return null===b?d:b}function h(a){return function(b){return Math.round(b*a)*(1/a)}}function i(a,c,d,e){function f(a,b){return 1-3*b+3*a}function g(a,b){return 3*b-6*a}function h(a){return 3*a}function i(a,b,c){return((f(b,c)*a+g(b,c))*a+h(b))*a}function j(a,b,c){return 3*f(b,c)*a*a+2*g(b,c)*a+h(b)}function k(b,c){for(var e=0;p>e;++e){var f=j(c,a,d);if(0===f)return c;var g=i(c,a,d)-b;c-=g/f}return c}function l(){for(var b=0;t>b;++b)x[b]=i(b*u,a,d)}function m(b,c,e){var f,g,h=0;do g=c+(e-c)/2,f=i(g,a,d)-b,f>0?e=g:c=g;while(Math.abs(f)>r&&++h<s);return g}function n(b){for(var c=0,e=1,f=t-1;e!=f&&x[e]<=b;++e)c+=u;--e;var g=(b-x[e])/(x[e+1]-x[e]),h=c+g*u,i=j(h,a,d);return i>=q?k(b,h):0==i?h:m(b,c,c+u)}function o(){y=!0,(a!=c||d!=e)&&l()}var p=4,q=.001,r=1e-7,s=10,t=11,u=1/(t-1),v="Float32Array"in b;if(4!==arguments.length)return!1;for(var w=0;4>w;++w)if("number"!=typeof arguments[w]||isNaN(arguments[w])||!isFinite(arguments[w]))return!1;a=Math.min(a,1),d=Math.min(d,1),a=Math.max(a,0),d=Math.max(d,0);var x=v?new Float32Array(t):new Array(t),y=!1,z=function(b){return y||o(),a===c&&d===e?b:0===b?0:1===b?1:i(n(b),c,e)};z.getControlPoints=function(){return[{x:a,y:c},{x:d,y:e}]};var A="generateBezier("+[a,c,d,e]+")";return z.toString=function(){return A},z}function j(a,b){var c=a;return p.isString(a)?t.Easings[a]||(c=!1):c=p.isArray(a)&&1===a.length?h.apply(null,a):p.isArray(a)&&2===a.length?u.apply(null,a.concat([b])):p.isArray(a)&&4===a.length?i.apply(null,a):!1,c===!1&&(c=t.Easings[t.defaults.easing]?t.defaults.easing:s),c}function k(a){if(a){var b=(new Date).getTime(),c=t.State.calls.length;c>1e4&&(t.State.calls=e(t.State.calls));for(var f=0;c>f;f++)if(t.State.calls[f]){var h=t.State.calls[f],i=h[0],j=h[2],n=h[3],o=!!n,q=null;n||(n=t.State.calls[f][3]=b-16);for(var r=Math.min((b-n)/j.duration,1),s=0,u=i.length;u>s;s++){var w=i[s],y=w.element;if(g(y)){var z=!1;if(j.display!==d&&null!==j.display&&"none"!==j.display){if("flex"===j.display){var A=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];m.each(A,function(a,b){v.setPropertyValue(y,"display",b)})}v.setPropertyValue(y,"display",j.display)}j.visibility!==d&&"hidden"!==j.visibility&&v.setPropertyValue(y,"visibility",j.visibility);for(var B in w)if("element"!==B){var C,D=w[B],E=p.isString(D.easing)?t.Easings[D.easing]:D.easing;if(1===r)C=D.endValue;else{var F=D.endValue-D.startValue;if(C=D.startValue+F*E(r,j,F),!o&&C===D.currentValue)continue}if(D.currentValue=C,"tween"===B)q=C;else{if(v.Hooks.registered[B]){var G=v.Hooks.getRoot(B),H=g(y).rootPropertyValueCache[G];H&&(D.rootPropertyValue=H)}var I=v.setPropertyValue(y,B,D.currentValue+(0===parseFloat(C)?"":D.unitType),D.rootPropertyValue,D.scrollData);v.Hooks.registered[B]&&(g(y).rootPropertyValueCache[G]=v.Normalizations.registered[G]?v.Normalizations.registered[G]("extract",null,I[1]):I[1]),"transform"===I[0]&&(z=!0)}}j.mobileHA&&g(y).transformCache.translate3d===d&&(g(y).transformCache.translate3d="(0px, 0px, 0px)",z=!0),z&&v.flushTransformCache(y)}}j.display!==d&&"none"!==j.display&&(t.State.calls[f][2].display=!1),j.visibility!==d&&"hidden"!==j.visibility&&(t.State.calls[f][2].visibility=!1),j.progress&&j.progress.call(h[1],h[1],r,Math.max(0,n+j.duration-b),n,q),1===r&&l(f)}}t.State.isTicking&&x(k)}function l(a,b){if(!t.State.calls[a])return!1;for(var c=t.State.calls[a][0],e=t.State.calls[a][1],f=t.State.calls[a][2],h=t.State.calls[a][4],i=!1,j=0,k=c.length;k>j;j++){var l=c[j].element;if(b||f.loop||("none"===f.display&&v.setPropertyValue(l,"display",f.display),"hidden"===f.visibility&&v.setPropertyValue(l,"visibility",f.visibility)),f.loop!==!0&&(m.queue(l)[1]===d||!/\.velocityQueueEntryFlag/i.test(m.queue(l)[1]))&&g(l)){g(l).isAnimating=!1,g(l).rootPropertyValueCache={};var n=!1;m.each(v.Lists.transforms3D,function(a,b){var c=/^scale/.test(b)?1:0,e=g(l).transformCache[b];g(l).transformCache[b]!==d&&new RegExp("^\\("+c+"[^.]").test(e)&&(n=!0,delete g(l).transformCache[b])}),f.mobileHA&&(n=!0,delete g(l).transformCache.translate3d),n&&v.flushTransformCache(l),v.Values.removeClass(l,"velocity-animating")}if(!b&&f.complete&&!f.loop&&j===k-1)try{f.complete.call(e,e)}catch(o){setTimeout(function(){throw o},1)}h&&f.loop!==!0&&h(e),g(l)&&f.loop===!0&&!b&&(m.each(g(l).tweensContainer,function(a,b){/^rotate/.test(a)&&360===parseFloat(b.endValue)&&(b.endValue=0,b.startValue=360),/^backgroundPosition/.test(a)&&100===parseFloat(b.endValue)&&"%"===b.unitType&&(b.endValue=0,b.startValue=100)}),t(l,"reverse",{loop:!0,delay:f.delay})),f.queue!==!1&&m.dequeue(l,f.queue)}t.State.calls[a]=!1;for(var p=0,q=t.State.calls.length;q>p;p++)if(t.State.calls[p]!==!1){i=!0;break}i===!1&&(t.State.isTicking=!1,delete t.State.calls,t.State.calls=[])}var m,n=function(){if(c.documentMode)return c.documentMode;for(var a=7;a>4;a--){var b=c.createElement("div");if(b.innerHTML="<!--[if IE "+a+"]><span></span><![endif]-->",b.getElementsByTagName("span").length)return b=null,a}return d}(),o=function(){var a=0;return b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||function(b){var c,d=(new Date).getTime();return c=Math.max(0,16-(d-a)),a=d+c,setTimeout(function(){b(d+c)},c)}}(),p={isString:function(a){return"string"==typeof a},isArray:Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},isFunction:function(a){return"[object Function]"===Object.prototype.toString.call(a)},isNode:function(a){return a&&a.nodeType},isNodeList:function(a){return"object"==typeof a&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(a))&&a.length!==d&&(0===a.length||"object"==typeof a[0]&&a[0].nodeType>0)},isWrapped:function(a){return a&&(a.jquery||b.Zepto&&b.Zepto.zepto.isZ(a))},isSVG:function(a){return b.SVGElement&&a instanceof b.SVGElement},isEmptyObject:function(a){for(var b in a)return!1;return!0}},q=!1;if(a.fn&&a.fn.jquery?(m=a,q=!0):m=b.Velocity.Utilities,8>=n&&!q)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=n)return void(jQuery.fn.velocity=jQuery.fn.animate);var r=400,s="swing",t={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:b.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:c.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:m,Redirects:{},Easings:{},Promise:b.Promise,defaults:{queue:"",duration:r,easing:s,begin:d,complete:d,progress:d,display:d,visibility:d,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(a){m.data(a,"velocity",{isSVG:p.isSVG(a),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};b.pageYOffset!==d?(t.State.scrollAnchor=b,t.State.scrollPropertyLeft="pageXOffset",t.State.scrollPropertyTop="pageYOffset"):(t.State.scrollAnchor=c.documentElement||c.body.parentNode||c.body,t.State.scrollPropertyLeft="scrollLeft",t.State.scrollPropertyTop="scrollTop");var u=function(){function a(a){return-a.tension*a.x-a.friction*a.v}function b(b,c,d){var e={x:b.x+d.dx*c,v:b.v+d.dv*c,tension:b.tension,friction:b.friction};return{dx:e.v,dv:a(e)}}function c(c,d){var e={dx:c.v,dv:a(c)},f=b(c,.5*d,e),g=b(c,.5*d,f),h=b(c,d,g),i=1/6*(e.dx+2*(f.dx+g.dx)+h.dx),j=1/6*(e.dv+2*(f.dv+g.dv)+h.dv);return c.x=c.x+i*d,c.v=c.v+j*d,c}return function d(a,b,e){var f,g,h,i={x:-1,v:0,tension:null,friction:null},j=[0],k=0,l=1e-4,m=.016;for(a=parseFloat(a)||500,b=parseFloat(b)||20,e=e||null,i.tension=a,i.friction=b,f=null!==e,f?(k=d(a,b),g=k/e*m):g=m;h=c(h||i,g),j.push(1+h.x),k+=16,Math.abs(h.x)>l&&Math.abs(h.v)>l;);return f?function(a){return j[a*(j.length-1)|0]}:k}}();t.Easings={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},spring:function(a){return 1-Math.cos(4.5*a*Math.PI)*Math.exp(6*-a)}},m.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(a,b){t.Easings[b[0]]=i.apply(null,b[1])});var v=t.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var a=0;a<v.Lists.colors.length;a++){var b="color"===v.Lists.colors[a]?"0 0 0 1":"255 255 255 1";v.Hooks.templates[v.Lists.colors[a]]=["Red Green Blue Alpha",b]}var c,d,e;if(n)for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");var f=d[1].match(v.RegEx.valueSplit);"Color"===e[0]&&(e.push(e.shift()),f.push(f.shift()),v.Hooks.templates[c]=[e.join(" "),f.join(" ")])}for(c in v.Hooks.templates){d=v.Hooks.templates[c],e=d[0].split(" ");for(var a in e){var g=c+e[a],h=a;v.Hooks.registered[g]=[c,h]}}},getRoot:function(a){var b=v.Hooks.registered[a];return b?b[0]:a},cleanRootPropertyValue:function(a,b){return v.RegEx.valueUnwrap.test(b)&&(b=b.match(v.RegEx.valueUnwrap)[1]),v.Values.isCSSNullValue(b)&&(b=v.Hooks.templates[a][1]),b},extractValue:function(a,b){var c=v.Hooks.registered[a];if(c){var d=c[0],e=c[1];return b=v.Hooks.cleanRootPropertyValue(d,b),b.toString().match(v.RegEx.valueSplit)[e]}return b},injectValue:function(a,b,c){var d=v.Hooks.registered[a];if(d){var e,f,g=d[0],h=d[1];return c=v.Hooks.cleanRootPropertyValue(g,c),e=c.toString().match(v.RegEx.valueSplit),e[h]=b,f=e.join(" ")}return c}},Normalizations:{registered:{clip:function(a,b,c){switch(a){case"name":return"clip";case"extract":var d;return v.RegEx.wrappedValueAlreadyExtracted.test(c)?d=c:(d=c.toString().match(v.RegEx.valueUnwrap),d=d?d[1].replace(/,(\s+)?/g," "):c),d;case"inject":return"rect("+c+")"}},blur:function(a,b,c){switch(a){case"name":return t.State.isFirefox?"filter":"-webkit-filter";case"extract":var d=parseFloat(c);if(!d&&0!==d){var e=c.toString().match(/blur\(([0-9]+[A-z]+)\)/i);d=e?e[1]:0}return d;case"inject":return parseFloat(c)?"blur("+c+")":"none"}},opacity:function(a,b,c){if(8>=n)switch(a){case"name":return"filter";case"extract":var d=c.toString().match(/alpha\(opacity=(.*)\)/i);return c=d?d[1]/100:1;case"inject":return b.style.zoom=1,parseFloat(c)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(c),10)+")"}else switch(a){case"name":return"opacity";case"extract":return c;case"inject":return c}}},register:function(){9>=n||t.State.isGingerbread||(v.Lists.transformsBase=v.Lists.transformsBase.concat(v.Lists.transforms3D));for(var a=0;a<v.Lists.transformsBase.length;a++)!function(){var b=v.Lists.transformsBase[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return"transform";case"extract":return g(c)===d||g(c).transformCache[b]===d?/^scale/i.test(b)?1:0:g(c).transformCache[b].replace(/[()]/g,"");case"inject":var f=!1;switch(b.substr(0,b.length-1)){case"translate":f=!/(%|px|em|rem|vw|vh|\d)$/i.test(e);break;case"scal":case"scale":t.State.isAndroid&&g(c).transformCache[b]===d&&1>e&&(e=1),f=!/(\d)$/i.test(e);break;case"skew":f=!/(deg|\d)$/i.test(e);break;case"rotate":f=!/(deg|\d)$/i.test(e)}return f||(g(c).transformCache[b]="("+e+")"),g(c).transformCache[b]}}}();for(var a=0;a<v.Lists.colors.length;a++)!function(){var b=v.Lists.colors[a];v.Normalizations.registered[b]=function(a,c,e){switch(a){case"name":return b;case"extract":var f;if(v.RegEx.wrappedValueAlreadyExtracted.test(e))f=e;else{var g,h={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(e)?g=h[e]!==d?h[e]:h.black:v.RegEx.isHex.test(e)?g="rgb("+v.Values.hexToRgb(e).join(" ")+")":/^rgba?\(/i.test(e)||(g=h.black),f=(g||e).toString().match(v.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=n||3!==f.split(" ").length||(f+=" 1"),f;case"inject":return 8>=n?4===e.split(" ").length&&(e=e.split(/\s+/).slice(0,3).join(" ")):3===e.split(" ").length&&(e+=" 1"),(8>=n?"rgb":"rgba")+"("+e.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(a){return a.replace(/-(\w)/g,function(a,b){return b.toUpperCase()})},SVGAttribute:function(a){var b="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(n||t.State.isAndroid&&!t.State.isChrome)&&(b+="|transform"),new RegExp("^("+b+")$","i").test(a)},prefixCheck:function(a){if(t.State.prefixMatches[a])return[t.State.prefixMatches[a],!0];for(var b=["","Webkit","Moz","ms","O"],c=0,d=b.length;d>c;c++){var e;if(e=0===c?a:b[c]+a.replace(/^\w/,function(a){return a.toUpperCase()}),p.isString(t.State.prefixElement.style[e]))return t.State.prefixMatches[a]=e,[e,!0]}return[a,!1]}},Values:{hexToRgb:function(a){var b,c=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return a=a.replace(c,function(a,b,c,d){return b+b+c+c+d+d}),b=d.exec(a),b?[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]:[0,0,0]},isCSSNullValue:function(a){return 0==a||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)},getUnitType:function(a){return/^(rotate|skew)/i.test(a)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(a)?"":"px"},getDisplayType:function(a){var b=a&&a.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(b)?"inline":/^(li)$/i.test(b)?"list-item":/^(tr)$/i.test(b)?"table-row":/^(table)$/i.test(b)?"table":/^(tbody)$/i.test(b)?"table-row-group":"block"},addClass:function(a,b){a.classList?a.classList.add(b):a.className+=(a.className.length?" ":"")+b},removeClass:function(a,b){a.classList?a.classList.remove(b):a.className=a.className.toString().replace(new RegExp("(^|\\s)"+b.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(a,c,e,f){function h(a,c){function e(){j&&v.setPropertyValue(a,"display","none")}var i=0;if(8>=n)i=m.css(a,c);else{var j=!1;if(/^(width|height)$/.test(c)&&0===v.getPropertyValue(a,"display")&&(j=!0,v.setPropertyValue(a,"display",v.Values.getDisplayType(a))),!f){if("height"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var k=a.offsetHeight-(parseFloat(v.getPropertyValue(a,"borderTopWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderBottomWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingTop"))||0)-(parseFloat(v.getPropertyValue(a,"paddingBottom"))||0);return e(),k}if("width"===c&&"border-box"!==v.getPropertyValue(a,"boxSizing").toString().toLowerCase()){var l=a.offsetWidth-(parseFloat(v.getPropertyValue(a,"borderLeftWidth"))||0)-(parseFloat(v.getPropertyValue(a,"borderRightWidth"))||0)-(parseFloat(v.getPropertyValue(a,"paddingLeft"))||0)-(parseFloat(v.getPropertyValue(a,"paddingRight"))||0);return e(),l}}var o;o=g(a)===d?b.getComputedStyle(a,null):g(a).computedStyle?g(a).computedStyle:g(a).computedStyle=b.getComputedStyle(a,null),"borderColor"===c&&(c="borderTopColor"),i=9===n&&"filter"===c?o.getPropertyValue(c):o[c],(""===i||null===i)&&(i=a.style[c]),e()}if("auto"===i&&/^(top|right|bottom|left)$/i.test(c)){var p=h(a,"position");("fixed"===p||"absolute"===p&&/top|left/i.test(c))&&(i=m(a).position()[c]+"px")}return i}var i;if(v.Hooks.registered[c]){var j=c,k=v.Hooks.getRoot(j);e===d&&(e=v.getPropertyValue(a,v.Names.prefixCheck(k)[0])),v.Normalizations.registered[k]&&(e=v.Normalizations.registered[k]("extract",a,e)),i=v.Hooks.extractValue(j,e)}else if(v.Normalizations.registered[c]){var l,o;l=v.Normalizations.registered[c]("name",a),"transform"!==l&&(o=h(a,v.Names.prefixCheck(l)[0]),v.Values.isCSSNullValue(o)&&v.Hooks.templates[c]&&(o=v.Hooks.templates[c][1])),i=v.Normalizations.registered[c]("extract",a,o)}if(!/^[\d-]/.test(i))if(g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c))if(/^(height|width)$/i.test(c))try{i=a.getBBox()[c]}catch(p){i=0}else i=a.getAttribute(c);else i=h(a,v.Names.prefixCheck(c)[0]);return v.Values.isCSSNullValue(i)&&(i=0),t.debug>=2&&console.log("Get "+c+": "+i),i},setPropertyValue:function(a,c,d,e,f){var h=c;if("scroll"===c)f.container?f.container["scroll"+f.direction]=d:"Left"===f.direction?b.scrollTo(d,f.alternateValue):b.scrollTo(f.alternateValue,d);else if(v.Normalizations.registered[c]&&"transform"===v.Normalizations.registered[c]("name",a))v.Normalizations.registered[c]("inject",a,d),h="transform",d=g(a).transformCache[c];else{if(v.Hooks.registered[c]){var i=c,j=v.Hooks.getRoot(c);e=e||v.getPropertyValue(a,j),d=v.Hooks.injectValue(i,d,e),c=j}if(v.Normalizations.registered[c]&&(d=v.Normalizations.registered[c]("inject",a,d),c=v.Normalizations.registered[c]("name",a)),h=v.Names.prefixCheck(c)[0],8>=n)try{a.style[h]=d}catch(k){t.debug&&console.log("Browser does not support ["+d+"] for ["+h+"]")}else g(a)&&g(a).isSVG&&v.Names.SVGAttribute(c)?a.setAttribute(c,d):a.style[h]=d;t.debug>=2&&console.log("Set "+c+" ("+h+"): "+d)}return[h,d]},flushTransformCache:function(a){function b(b){return parseFloat(v.getPropertyValue(a,b))}var c="";if((n||t.State.isAndroid&&!t.State.isChrome)&&g(a).isSVG){var d={translate:[b("translateX"),b("translateY")],skewX:[b("skewX")],skewY:[b("skewY")],scale:1!==b("scale")?[b("scale"),b("scale")]:[b("scaleX"),b("scaleY")],rotate:[b("rotateZ"),0,0]};m.each(g(a).transformCache,function(a){/^translate/i.test(a)?a="translate":/^scale/i.test(a)?a="scale":/^rotate/i.test(a)&&(a="rotate"),d[a]&&(c+=a+"("+d[a].join(" ")+") ",delete d[a])})}else{var e,f;m.each(g(a).transformCache,function(b){return e=g(a).transformCache[b],"transformPerspective"===b?(f=e,!0):(9===n&&"rotateZ"===b&&(b="rotate"),void(c+=b+e+" "))}),f&&(c="perspective"+f+" "+c)}v.setPropertyValue(a,"transform",c)}};v.Hooks.register(),v.Normalizations.register(),t.hook=function(a,b,c){var e=d;return a=f(a),m.each(a,function(a,f){if(g(f)===d&&t.init(f),c===d)e===d&&(e=t.CSS.getPropertyValue(f,b));else{var h=t.CSS.setPropertyValue(f,b,c);"transform"===h[0]&&t.CSS.flushTransformCache(f),e=h}}),e};var w=function(){function a(){return h?B.promise||null:i}function e(){function a(){function a(a,b){var c=d,e=d,g=d;return p.isArray(a)?(c=a[0],!p.isArray(a[1])&&/^[\d-]/.test(a[1])||p.isFunction(a[1])||v.RegEx.isHex.test(a[1])?g=a[1]:(p.isString(a[1])&&!v.RegEx.isHex.test(a[1])||p.isArray(a[1]))&&(e=b?a[1]:j(a[1],h.duration),a[2]!==d&&(g=a[2]))):c=a,b||(e=e||h.easing),p.isFunction(c)&&(c=c.call(f,y,x)),p.isFunction(g)&&(g=g.call(f,y,x)),[c||0,e,g]}function l(a,b){var c,d;return d=(b||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(a){return c=a,""}),c||(c=v.Values.getUnitType(a)),[d,c]}function n(){var a={myParent:f.parentNode||c.body,position:v.getPropertyValue(f,"position"),fontSize:v.getPropertyValue(f,"fontSize")},d=a.position===I.lastPosition&&a.myParent===I.lastParent,e=a.fontSize===I.lastFontSize;I.lastParent=a.myParent,I.lastPosition=a.position,I.lastFontSize=a.fontSize;var h=100,i={};if(e&&d)i.emToPx=I.lastEmToPx,i.percentToPxWidth=I.lastPercentToPxWidth,i.percentToPxHeight=I.lastPercentToPxHeight;else{var j=g(f).isSVG?c.createElementNS("http://www.w3.org/2000/svg","rect"):c.createElement("div");t.init(j),a.myParent.appendChild(j),m.each(["overflow","overflowX","overflowY"],function(a,b){t.CSS.setPropertyValue(j,b,"hidden")}),t.CSS.setPropertyValue(j,"position",a.position),t.CSS.setPropertyValue(j,"fontSize",a.fontSize),t.CSS.setPropertyValue(j,"boxSizing","content-box"),m.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(a,b){t.CSS.setPropertyValue(j,b,h+"%")}),t.CSS.setPropertyValue(j,"paddingLeft",h+"em"),i.percentToPxWidth=I.lastPercentToPxWidth=(parseFloat(v.getPropertyValue(j,"width",null,!0))||1)/h,i.percentToPxHeight=I.lastPercentToPxHeight=(parseFloat(v.getPropertyValue(j,"height",null,!0))||1)/h,i.emToPx=I.lastEmToPx=(parseFloat(v.getPropertyValue(j,"paddingLeft"))||1)/h,a.myParent.removeChild(j)}return null===I.remToPx&&(I.remToPx=parseFloat(v.getPropertyValue(c.body,"fontSize"))||16),null===I.vwToPx&&(I.vwToPx=parseFloat(b.innerWidth)/100,I.vhToPx=parseFloat(b.innerHeight)/100),i.remToPx=I.remToPx,i.vwToPx=I.vwToPx,i.vhToPx=I.vhToPx,t.debug>=1&&console.log("Unit ratios: "+JSON.stringify(i),f),i}if(h.begin&&0===y)try{h.begin.call(o,o)}catch(r){setTimeout(function(){throw r},1)}if("scroll"===C){var u,w,z,A=/^x$/i.test(h.axis)?"Left":"Top",D=parseFloat(h.offset)||0;h.container?p.isWrapped(h.container)||p.isNode(h.container)?(h.container=h.container[0]||h.container,u=h.container["scroll"+A],z=u+m(f).position()[A.toLowerCase()]+D):h.container=null:(u=t.State.scrollAnchor[t.State["scrollProperty"+A]],w=t.State.scrollAnchor[t.State["scrollProperty"+("Left"===A?"Top":"Left")]],z=m(f).offset()[A.toLowerCase()]+D),i={scroll:{rootPropertyValue:!1,startValue:u,currentValue:u,endValue:z,unitType:"",easing:h.easing,scrollData:{container:h.container,direction:A,alternateValue:w}},element:f},t.debug&&console.log("tweensContainer (scroll): ",i.scroll,f)}else if("reverse"===C){if(!g(f).tweensContainer)return void m.dequeue(f,h.queue);"none"===g(f).opts.display&&(g(f).opts.display="auto"),"hidden"===g(f).opts.visibility&&(g(f).opts.visibility="visible"),g(f).opts.loop=!1,g(f).opts.begin=null,g(f).opts.complete=null,s.easing||delete h.easing,s.duration||delete h.duration,h=m.extend({},g(f).opts,h);var E=m.extend(!0,{},g(f).tweensContainer);for(var F in E)if("element"!==F){var G=E[F].startValue;E[F].startValue=E[F].currentValue=E[F].endValue,E[F].endValue=G,p.isEmptyObject(s)||(E[F].easing=h.easing),t.debug&&console.log("reverse tweensContainer ("+F+"): "+JSON.stringify(E[F]),f)}i=E}else if("start"===C){var E;g(f).tweensContainer&&g(f).isAnimating===!0&&(E=g(f).tweensContainer),m.each(q,function(b,c){if(RegExp("^"+v.Lists.colors.join("$|^")+"$").test(b)){var e=a(c,!0),f=e[0],g=e[1],h=e[2];if(v.RegEx.isHex.test(f)){for(var i=["Red","Green","Blue"],j=v.Values.hexToRgb(f),k=h?v.Values.hexToRgb(h):d,l=0;l<i.length;l++){var m=[j[l]];g&&m.push(g),k!==d&&m.push(k[l]),q[b+i[l]]=m}delete q[b]}}});for(var H in q){var K=a(q[H]),L=K[0],M=K[1],N=K[2];H=v.Names.camelCase(H);var O=v.Hooks.getRoot(H),P=!1;if(g(f).isSVG||"tween"===O||v.Names.prefixCheck(O)[1]!==!1||v.Normalizations.registered[O]!==d){(h.display!==d&&null!==h.display&&"none"!==h.display||h.visibility!==d&&"hidden"!==h.visibility)&&/opacity|filter/.test(H)&&!N&&0!==L&&(N=0),h._cacheValues&&E&&E[H]?(N===d&&(N=E[H].endValue+E[H].unitType),P=g(f).rootPropertyValueCache[O]):v.Hooks.registered[H]?N===d?(P=v.getPropertyValue(f,O),N=v.getPropertyValue(f,H,P)):P=v.Hooks.templates[O][1]:N===d&&(N=v.getPropertyValue(f,H));var Q,R,S,T=!1;if(Q=l(H,N),N=Q[0],S=Q[1],Q=l(H,L),L=Q[0].replace(/^([+-\/*])=/,function(a,b){return T=b,""}),R=Q[1],N=parseFloat(N)||0,L=parseFloat(L)||0,"%"===R&&(/^(fontSize|lineHeight)$/.test(H)?(L/=100,R="em"):/^scale/.test(H)?(L/=100,R=""):/(Red|Green|Blue)$/i.test(H)&&(L=L/100*255,R="")),/[\/*]/.test(T))R=S;else if(S!==R&&0!==N)if(0===L)R=S;else{e=e||n();var U=/margin|padding|left|right|width|text|word|letter/i.test(H)||/X$/.test(H)||"x"===H?"x":"y";switch(S){case"%":N*="x"===U?e.percentToPxWidth:e.percentToPxHeight;break;case"px":break;default:N*=e[S+"ToPx"]}switch(R){case"%":N*=1/("x"===U?e.percentToPxWidth:e.percentToPxHeight);break;case"px":break;default:
N*=1/e[R+"ToPx"]}}switch(T){case"+":L=N+L;break;case"-":L=N-L;break;case"*":L=N*L;break;case"/":L=N/L}i[H]={rootPropertyValue:P,startValue:N,currentValue:N,endValue:L,unitType:R,easing:M},t.debug&&console.log("tweensContainer ("+H+"): "+JSON.stringify(i[H]),f)}else t.debug&&console.log("Skipping ["+O+"] due to a lack of browser support.")}i.element=f}i.element&&(v.Values.addClass(f,"velocity-animating"),J.push(i),""===h.queue&&(g(f).tweensContainer=i,g(f).opts=h),g(f).isAnimating=!0,y===x-1?(t.State.calls.push([J,o,h,null,B.resolver]),t.State.isTicking===!1&&(t.State.isTicking=!0,k())):y++)}var e,f=this,h=m.extend({},t.defaults,s),i={};switch(g(f)===d&&t.init(f),parseFloat(h.delay)&&h.queue!==!1&&m.queue(f,h.queue,function(a){t.velocityQueueEntryFlag=!0,g(f).delayTimer={setTimeout:setTimeout(a,parseFloat(h.delay)),next:a}}),h.duration.toString().toLowerCase()){case"fast":h.duration=200;break;case"normal":h.duration=r;break;case"slow":h.duration=600;break;default:h.duration=parseFloat(h.duration)||1}t.mock!==!1&&(t.mock===!0?h.duration=h.delay=1:(h.duration*=parseFloat(t.mock)||1,h.delay*=parseFloat(t.mock)||1)),h.easing=j(h.easing,h.duration),h.begin&&!p.isFunction(h.begin)&&(h.begin=null),h.progress&&!p.isFunction(h.progress)&&(h.progress=null),h.complete&&!p.isFunction(h.complete)&&(h.complete=null),h.display!==d&&null!==h.display&&(h.display=h.display.toString().toLowerCase(),"auto"===h.display&&(h.display=t.CSS.Values.getDisplayType(f))),h.visibility!==d&&null!==h.visibility&&(h.visibility=h.visibility.toString().toLowerCase()),h.mobileHA=h.mobileHA&&t.State.isMobile&&!t.State.isGingerbread,h.queue===!1?h.delay?setTimeout(a,h.delay):a():m.queue(f,h.queue,function(b,c){return c===!0?(B.promise&&B.resolver(o),!0):(t.velocityQueueEntryFlag=!0,void a(b))}),""!==h.queue&&"fx"!==h.queue||"inprogress"===m.queue(f)[0]||m.dequeue(f)}var h,i,n,o,q,s,u=arguments[0]&&(arguments[0].p||m.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||p.isString(arguments[0].properties));if(p.isWrapped(this)?(h=!1,n=0,o=this,i=this):(h=!0,n=1,o=u?arguments[0].elements||arguments[0].e:arguments[0]),o=f(o)){u?(q=arguments[0].properties||arguments[0].p,s=arguments[0].options||arguments[0].o):(q=arguments[n],s=arguments[n+1]);var x=o.length,y=0;if(!/^(stop|finish)$/i.test(q)&&!m.isPlainObject(s)){var z=n+1;s={};for(var A=z;A<arguments.length;A++)p.isArray(arguments[A])||!/^(fast|normal|slow)$/i.test(arguments[A])&&!/^\d/.test(arguments[A])?p.isString(arguments[A])||p.isArray(arguments[A])?s.easing=arguments[A]:p.isFunction(arguments[A])&&(s.complete=arguments[A]):s.duration=arguments[A]}var B={promise:null,resolver:null,rejecter:null};h&&t.Promise&&(B.promise=new t.Promise(function(a,b){B.resolver=a,B.rejecter=b}));var C;switch(q){case"scroll":C="scroll";break;case"reverse":C="reverse";break;case"finish":case"stop":m.each(o,function(a,b){g(b)&&g(b).delayTimer&&(clearTimeout(g(b).delayTimer.setTimeout),g(b).delayTimer.next&&g(b).delayTimer.next(),delete g(b).delayTimer)});var D=[];return m.each(t.State.calls,function(a,b){b&&m.each(b[1],function(c,e){var f=s===d?"":s;return f===!0||b[2].queue===f||s===d&&b[2].queue===!1?void m.each(o,function(c,d){d===e&&((s===!0||p.isString(s))&&(m.each(m.queue(d,p.isString(s)?s:""),function(a,b){p.isFunction(b)&&b(null,!0)}),m.queue(d,p.isString(s)?s:"",[])),"stop"===q?(g(d)&&g(d).tweensContainer&&f!==!1&&m.each(g(d).tweensContainer,function(a,b){b.endValue=b.currentValue}),D.push(a)):"finish"===q&&(b[2].duration=1))}):!0})}),"stop"===q&&(m.each(D,function(a,b){l(b,!0)}),B.promise&&B.resolver(o)),a();default:if(!m.isPlainObject(q)||p.isEmptyObject(q)){if(p.isString(q)&&t.Redirects[q]){var E=m.extend({},s),F=E.duration,G=E.delay||0;return E.backwards===!0&&(o=m.extend(!0,[],o).reverse()),m.each(o,function(a,b){parseFloat(E.stagger)?E.delay=G+parseFloat(E.stagger)*a:p.isFunction(E.stagger)&&(E.delay=G+E.stagger.call(b,a,x)),E.drag&&(E.duration=parseFloat(F)||(/^(callout|transition)/.test(q)?1e3:r),E.duration=Math.max(E.duration*(E.backwards?1-a/x:(a+1)/x),.75*E.duration,200)),t.Redirects[q].call(b,b,E||{},a,x,o,B.promise?B:d)}),a()}var H="Velocity: First argument ("+q+") was not a property map, a known action, or a registered redirect. Aborting.";return B.promise?B.rejecter(new Error(H)):console.log(H),a()}C="start"}var I={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},J=[];m.each(o,function(a,b){p.isNode(b)&&e.call(b)});var K,E=m.extend({},t.defaults,s);if(E.loop=parseInt(E.loop),K=2*E.loop-1,E.loop)for(var L=0;K>L;L++){var M={delay:E.delay,progress:E.progress};L===K-1&&(M.display=E.display,M.visibility=E.visibility,M.complete=E.complete),w(o,"reverse",M)}return a()}};t=m.extend(w,t),t.animate=w;var x=b.requestAnimationFrame||o;return t.State.isMobile||c.hidden===d||c.addEventListener("visibilitychange",function(){c.hidden?(x=function(a){return setTimeout(function(){a(!0)},16)},k()):x=b.requestAnimationFrame||o}),a.Velocity=t,a!==b&&(a.fn.velocity=w,a.fn.velocity.defaults=t.defaults),m.each(["Down","Up"],function(a,b){t.Redirects["slide"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j=i.begin,k=i.complete,l={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},n={};i.display===d&&(i.display="Down"===b?"inline"===t.CSS.Values.getDisplayType(a)?"inline-block":"block":"none"),i.begin=function(){j&&j.call(g,g);for(var c in l){n[c]=a.style[c];var d=t.CSS.getPropertyValue(a,c);l[c]="Down"===b?[d,0]:[0,d]}n.overflow=a.style.overflow,a.style.overflow="hidden"},i.complete=function(){for(var b in n)a.style[b]=n[b];k&&k.call(g,g),h&&h.resolver(g)},t(a,l,i)}}),m.each(["In","Out"],function(a,b){t.Redirects["fade"+b]=function(a,c,e,f,g,h){var i=m.extend({},c),j={opacity:"In"===b?1:0},k=i.complete;i.complete=e!==f-1?i.begin=null:function(){k&&k.call(g,g),h&&h.resolver(g)},i.display===d&&(i.display="In"===b?"auto":"none"),t(this,j,i)}}),t}(window.jQuery||window.Zepto||window,window,document)}),!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(k(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function i(a,b){return h(a,b,!0)}function j(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&h(d,c)}function k(a,b){return function(){return a.apply(b,arguments)}}function l(a,b){return typeof a==ka?a.apply(b?b[0]||d:d,b):a}function m(a,b){return a===d?b:a}function n(a,b,c){g(r(b),function(b){a.addEventListener(b,c,!1)})}function o(a,b,c){g(r(b),function(b){a.removeEventListener(b,c,!1)})}function p(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function q(a,b){return a.indexOf(b)>-1}function r(a){return a.trim().split(/\s+/g)}function s(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function t(a){return Array.prototype.slice.call(a,0)}function u(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];s(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function v(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ia.length;){if(c=ia[g],e=c?c+f:b,e in a)return e;g++}return d}function w(){return oa++}function x(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function y(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){l(a.options.enable,[a])&&c.handler(b)},this.init()}function z(a){var b,c=a.options.inputClass;return new(b=c?c:ra?N:sa?Q:qa?S:M)(a,A)}function A(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&ya&&0===d-e,g=b&(Aa|Ba)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,B(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function B(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=E(b)),e>1&&!c.firstMultiple?c.firstMultiple=E(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=F(d);b.timeStamp=na(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=J(h,i),b.distance=I(h,i),C(c,b),b.offsetDirection=H(b.deltaX,b.deltaY),b.scale=g?L(g.pointers,d):1,b.rotation=g?K(g.pointers,d):0,D(c,b);var j=a.element;p(b.srcEvent.target,j)&&(j=b.srcEvent.target),b.target=j}function C(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===ya||f.eventType===Aa)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function D(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ba&&(i>xa||h.velocity===d)){var j=h.deltaX-b.deltaX,k=h.deltaY-b.deltaY,l=G(i,j,k);e=l.x,f=l.y,c=ma(l.x)>ma(l.y)?l.x:l.y,g=H(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function E(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:la(a.pointers[c].clientX),clientY:la(a.pointers[c].clientY)},c++;return{timeStamp:na(),pointers:b,center:F(b),deltaX:a.deltaX,deltaY:a.deltaY}}function F(a){var b=a.length;if(1===b)return{x:la(a[0].clientX),y:la(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:la(c/b),y:la(d/b)}}function G(a,b,c){return{x:b/a||0,y:c/a||0}}function H(a,b){return a===b?Ca:ma(a)>=ma(b)?a>0?Da:Ea:b>0?Fa:Ga}function I(a,b,c){c||(c=Ka);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function J(a,b,c){c||(c=Ka);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function K(a,b){return J(b[1],b[0],La)-J(a[1],a[0],La)}function L(a,b){return I(b[0],b[1],La)/I(a[0],a[1],La)}function M(){this.evEl=Na,this.evWin=Oa,this.allow=!0,this.pressed=!1,y.apply(this,arguments)}function N(){this.evEl=Ra,this.evWin=Sa,y.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function O(){this.evTarget=Ua,this.evWin=Va,this.started=!1,y.apply(this,arguments)}function P(a,b){var c=t(a.touches),d=t(a.changedTouches);return b&(Aa|Ba)&&(c=u(c.concat(d),"identifier",!0)),[c,d]}function Q(){this.evTarget=Xa,this.targetIds={},y.apply(this,arguments)}function R(a,b){var c=t(a.touches),d=this.targetIds;if(b&(ya|za)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=t(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return p(a.target,i)}),b===ya)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Aa|Ba)&&delete d[g[e].identifier],e++;return h.length?[u(f.concat(h),"identifier",!0),h]:void 0}function S(){y.apply(this,arguments);var a=k(this.handler,this);this.touch=new Q(this.manager,a),this.mouse=new M(this.manager,a)}function T(a,b){this.manager=a,this.set(b)}function U(a){if(q(a,bb))return bb;var b=q(a,cb),c=q(a,db);return b&&c?cb+" "+db:b||c?b?cb:db:q(a,ab)?ab:_a}function V(a){this.id=w(),this.manager=null,this.options=i(a||{},this.defaults),this.options.enable=m(this.options.enable,!0),this.state=eb,this.simultaneous={},this.requireFail=[]}function W(a){return a&jb?"cancel":a&hb?"end":a&gb?"move":a&fb?"start":""}function X(a){return a==Ga?"down":a==Fa?"up":a==Da?"left":a==Ea?"right":""}function Y(a,b){var c=b.manager;return c?c.get(a):a}function Z(){V.apply(this,arguments)}function $(){Z.apply(this,arguments),this.pX=null,this.pY=null}function _(){Z.apply(this,arguments)}function aa(){V.apply(this,arguments),this._timer=null,this._input=null}function ba(){Z.apply(this,arguments)}function ca(){Z.apply(this,arguments)}function da(){V.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ea(a,b){return b=b||{},b.recognizers=m(b.recognizers,ea.defaults.preset),new fa(a,b)}function fa(a,b){b=b||{},this.options=i(b,ea.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=z(this),this.touchAction=new T(this,this.options.touchAction),ga(this,!0),g(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ga(a,b){var c=a.element;g(a.options.cssProps,function(a,d){c.style[v(c.style,d)]=b?a:""})}function ha(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var ia=["","webkit","moz","MS","ms","o"],ja=b.createElement("div"),ka="function",la=Math.round,ma=Math.abs,na=Date.now,oa=1,pa=/mobile|tablet|ip(ad|hone|od)|android/i,qa="ontouchstart"in a,ra=v(a,"PointerEvent")!==d,sa=qa&&pa.test(navigator.userAgent),ta="touch",ua="pen",va="mouse",wa="kinect",xa=25,ya=1,za=2,Aa=4,Ba=8,Ca=1,Da=2,Ea=4,Fa=8,Ga=16,Ha=Da|Ea,Ia=Fa|Ga,Ja=Ha|Ia,Ka=["x","y"],La=["clientX","clientY"];y.prototype={handler:function(){},init:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(x(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&o(this.element,this.evEl,this.domHandler),this.evTarget&&o(this.target,this.evTarget,this.domHandler),this.evWin&&o(x(this.element),this.evWin,this.domHandler)}};var Ma={mousedown:ya,mousemove:za,mouseup:Aa},Na="mousedown",Oa="mousemove mouseup";j(M,y,{handler:function(a){var b=Ma[a.type];b&ya&&0===a.button&&(this.pressed=!0),b&za&&1!==a.which&&(b=Aa),this.pressed&&this.allow&&(b&Aa&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:va,srcEvent:a}))}});var Pa={pointerdown:ya,pointermove:za,pointerup:Aa,pointercancel:Ba,pointerout:Ba},Qa={2:ta,3:ua,4:va,5:wa},Ra="pointerdown",Sa="pointermove pointerup pointercancel";a.MSPointerEvent&&(Ra="MSPointerDown",Sa="MSPointerMove MSPointerUp MSPointerCancel"),j(N,y,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Pa[d],f=Qa[a.pointerType]||a.pointerType,g=f==ta,h=s(b,a.pointerId,"pointerId");e&ya&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Aa|Ba)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Ta={touchstart:ya,touchmove:za,touchend:Aa,touchcancel:Ba},Ua="touchstart",Va="touchstart touchmove touchend touchcancel";j(O,y,{handler:function(a){var b=Ta[a.type];if(b===ya&&(this.started=!0),this.started){var c=P.call(this,a,b);b&(Aa|Ba)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:ta,srcEvent:a})}}});var Wa={touchstart:ya,touchmove:za,touchend:Aa,touchcancel:Ba},Xa="touchstart touchmove touchend touchcancel";j(Q,y,{handler:function(a){var b=Wa[a.type],c=R.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:ta,srcEvent:a})}}),j(S,y,{handler:function(a,b,c){var d=c.pointerType==ta,e=c.pointerType==va;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Aa|Ba)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Ya=v(ja.style,"touchAction"),Za=Ya!==d,$a="compute",_a="auto",ab="manipulation",bb="none",cb="pan-x",db="pan-y";T.prototype={set:function(a){a==$a&&(a=this.compute()),Za&&(this.manager.element.style[Ya]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){l(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),U(a.join(" "))},preventDefaults:function(a){if(!Za){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=q(d,bb),f=q(d,db),g=q(d,cb);return e||f&&c&Ha||g&&c&Ia?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var eb=1,fb=2,gb=4,hb=8,ib=hb,jb=16,kb=32;V.prototype={defaults:{},set:function(a){return h(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=Y(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=Y(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=Y(a,this),-1===s(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=Y(a,this);var b=s(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(c.options.event+(b?W(d):""),a)}var c=this,d=this.state;hb>d&&b(!0),b(),d>=hb&&b(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=kb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(kb|eb)))return!1;a++}return!0},recognize:function(a){var b=h({},a);return l(this.options.enable,[this,b])?(this.state&(ib|jb|kb)&&(this.state=eb),this.state=this.process(b),void(this.state&(fb|gb|hb|jb)&&this.tryEmit(b))):(this.reset(),void(this.state=kb))},process:function(){},getTouchAction:function(){},reset:function(){}},j(Z,V,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(fb|gb),e=this.attrTest(a);return d&&(c&Ba||!e)?b|jb:d||e?c&Aa?b|hb:b&fb?b|gb:fb:kb}}),j($,Z,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ja},getTouchAction:function(){var a=this.options.direction,b=[];return a&Ha&&b.push(db),a&Ia&&b.push(cb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Ha?(e=0===f?Ca:0>f?Da:Ea,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ca:0>g?Fa:Ga,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return Z.prototype.attrTest.call(this,a)&&(this.state&fb||!(this.state&fb)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),j(_,Z,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[bb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&fb)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),j(aa,V,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[_a]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Aa|Ba)&&!f)this.reset();else if(a.eventType&ya)this.reset(),this._timer=e(function(){this.state=ib,this.tryEmit()},b.time,this);else if(a.eventType&Aa)return ib;return kb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===ib&&(a&&a.eventType&Aa?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=na(),this.manager.emit(this.options.event,this._input)))}}),j(ba,Z,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[bb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&fb)}}),j(ca,Z,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Ha|Ia,pointers:1},getTouchAction:function(){return $.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Ha|Ia)?b=a.velocity:c&Ha?b=a.velocityX:c&Ia&&(b=a.velocityY),this._super.attrTest.call(this,a)&&c&a.direction&&a.distance>this.options.threshold&&ma(b)>this.options.velocity&&a.eventType&Aa},emit:function(a){var b=X(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),j(da,V,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[ab]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&ya&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Aa)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||I(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=ib,this.tryEmit()},b.interval,this),fb):ib}return kb},failTimeout:function(){return this._timer=e(function(){this.state=kb},this.options.interval,this),kb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==ib&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ea.VERSION="2.0.4",ea.defaults={domEvents:!1,touchAction:$a,enable:!0,inputTarget:null,inputClass:null,preset:[[ba,{enable:!1}],[_,{enable:!1},["rotate"]],[ca,{direction:Ha}],[$,{direction:Ha},["swipe"]],[da],[da,{event:"doubletap",taps:2},["tap"]],[aa]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var lb=1,mb=2;fa.prototype={set:function(a){return h(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?mb:lb},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&ib)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===mb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(fb|gb|hb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof V)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(s(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return g(r(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return g(r(a),function(a){b?c[a].splice(s(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&ha(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ga(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},h(ea,{INPUT_START:ya,INPUT_MOVE:za,INPUT_END:Aa,INPUT_CANCEL:Ba,STATE_POSSIBLE:eb,STATE_BEGAN:fb,STATE_CHANGED:gb,STATE_ENDED:hb,STATE_RECOGNIZED:ib,STATE_CANCELLED:jb,STATE_FAILED:kb,DIRECTION_NONE:Ca,DIRECTION_LEFT:Da,DIRECTION_RIGHT:Ea,DIRECTION_UP:Fa,DIRECTION_DOWN:Ga,DIRECTION_HORIZONTAL:Ha,DIRECTION_VERTICAL:Ia,DIRECTION_ALL:Ja,Manager:fa,Input:y,TouchAction:T,TouchInput:Q,MouseInput:M,PointerEventInput:N,TouchMouseInput:S,SingleTouchInput:O,Recognizer:V,AttrRecognizer:Z,Tap:da,Pan:$,Swipe:ca,Pinch:_,Rotate:ba,Press:aa,on:n,off:o,each:g,merge:i,extend:h,inherit:j,bindFn:k,prefixed:v}),typeof define==ka&&define.amd?define(function(){return ea}):"undefined"!=typeof module&&module.exports?module.exports=ea:a[c]=ea}(window,document,"Hammer"),function(a){"function"==typeof define&&define.amd?define(["jquery","hammerjs"],a):"object"==typeof exports?a(require("jquery"),require("hammerjs")):a(jQuery,Hammer)}(function(a,b){function c(c,d){var e=a(c);e.data("hammer")||e.data("hammer",new b(e[0],d))}a.fn.hammer=function(a){return this.each(function(){c(this,a)})},b.Manager.prototype.emit=function(b){return function(c,d){b.call(this,c,d),a(this.element).trigger({type:c,gesture:d})}}(b.Manager.prototype.emit)}),Materialize={},Materialize.guid=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()}}(),Materialize.elementOrParentIsFixed=function(a){var b=$(a),c=b.add(b.parents()),d=!1;return c.each(function(){return"fixed"===$(this).css("position")?(d=!0,!1):void 0}),d};var Vel;Vel=$?$.Velocity:Velocity,function(a){a.fn.collapsible=function(b){var c={accordion:void 0};return b=a.extend(c,b),this.each(function(){function c(b){h=g.find("> li > .collapsible-header"),b.hasClass("active")?b.parent().addClass("active"):b.parent().removeClass("active"),b.parent().hasClass("active")?b.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}}):b.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}}),h.not(b).removeClass("active").parent().removeClass("active"),h.not(b).parent().children(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}})}function d(b){b.hasClass("active")?b.parent().addClass("active"):b.parent().removeClass("active"),b.parent().hasClass("active")?b.siblings(".collapsible-body").stop(!0,!1).slideDown({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}}):b.siblings(".collapsible-body").stop(!0,!1).slideUp({duration:350,easing:"easeOutQuart",queue:!1,complete:function(){a(this).css("height","")}})}function e(a){var b=f(a);return b.length>0}function f(a){return a.closest("li > .collapsible-header")}var g=a(this),h=a(this).find("> li > .collapsible-header"),i=g.data("collapsible");g.off("click.collapse",".collapsible-header"),h.off("click.collapse"),b.accordion||"accordion"==i||void 0==i?(h=g.find("> li > .collapsible-header"),h.on("click.collapse",function(b){var d=a(b.target);e(d)&&(d=f(d)),d.toggleClass("active"),c(d)}),c(h.filter(".active").first())):h.each(function(){a(this).on("click.collapse",function(b){var c=a(b.target);e(c)&&(c=f(c)),c.toggleClass("active"),d(c)}),a(this).hasClass("active")&&d(a(this))})})},a(document).ready(function(){a(".collapsible").collapsible()})}(jQuery),function(a){a.fn.scrollTo=function(b){return a(this).scrollTop(a(this).scrollTop()-a(this).offset().top+a(b).offset().top),this},a.fn.dropdown=function(b){var c={inDuration:300,outDuration:225,constrain_width:!0,hover:!1,gutter:0,belowOrigin:!1};this.each(function(){function d(){void 0!=g.data("induration")&&(h.inDuration=g.data("inDuration")),void 0!=g.data("outduration")&&(h.outDuration=g.data("outDuration")),void 0!=g.data("constrainwidth")&&(h.constrain_width=g.data("constrainwidth")),void 0!=g.data("hover")&&(h.hover=g.data("hover")),void 0!=g.data("gutter")&&(h.gutter=g.data("gutter")),void 0!=g.data("beloworigin")&&(h.belowOrigin=g.data("beloworigin"))}function e(){d(),i.addClass("active"),1==h.constrain_width&&i.css("width",g.outerWidth());var b=0;1==h.belowOrigin&&(b=g.height());var c=g.offset().left,e=0,f=h.gutter;c+i.innerWidth()>a(window).width()&&(e=g.innerWidth()-i.innerWidth(),f=-1*f),i.css({position:"absolute",top:g.position().top+b,left:g.position().left+e+f}),i.stop(!0,!0).css("opacity",0).slideDown({queue:!1,duration:h.inDuration,easing:"easeOutCubic",complete:function(){a(this).css("height","")}}).animate({opacity:1},{queue:!1,duration:h.inDuration,easing:"easeOutSine"})}function f(){i.fadeOut(h.outDuration),i.removeClass("active")}var g=a(this),h=a.extend({},c,b),i=a("#"+g.attr("data-activates"));if(d(),g.after(i),h.hover){var j=!1;g.unbind("click."+g.attr("id")),g.on("mouseenter",function(){j===!1&&(e(),j=!0)}),g.on("mouseleave",function(b){a(b.toElement).closest(".dropdown-content").is(i)||(i.stop(!0,!0),f(),j=!1)}),i.on("mouseleave",function(b){a(b.toElement).closest(".dropdown-button").is(g)||(i.stop(!0,!0),f(),j=!1)})}else g.unbind("click."+g.attr("id")),g.bind("click."+g.attr("id"),function(b){g[0]==b.currentTarget&&0===a(b.target).closest(".dropdown-content").length?(b.preventDefault(),e()):g.hasClass("active")&&(f(),a(document).unbind("click."+i.attr("id"))),i.hasClass("active")&&a(document).bind("click."+i.attr("id"),function(b){!i.is(b.target)&&!g.is(b.target)&&!g.find(b.target).length>0&&(f(),a(document).unbind("click."+i.attr("id")))})});g.on("open",e),g.on("close",f)})},a(document).ready(function(){a(".dropdown-button").dropdown()})}(jQuery),function(a){a.fn.extend({openModal:function(b){var c=this,d=a('<div id="lean-overlay"></div>');a("body").append(d);var e={opacity:.5,in_duration:350,out_duration:250,ready:void 0,complete:void 0,dismissible:!0};b=a.extend(e,b),b.dismissible&&(a("#lean-overlay").click(function(){a(c).closeModal(b)}),a(document).on("keyup.leanModal",function(d){27===d.keyCode&&a(c).closeModal(b)})),a(c).find(".modal-close").click(function(){a(c).closeModal(b)}),a("#lean-overlay").css({display:"block",opacity:0}),a(c).css({display:"block",opacity:0}),a("#lean-overlay").velocity({opacity:b.opacity},{duration:b.in_duration,queue:!1,ease:"easeOutCubic"}),a(c).hasClass("bottom-sheet")?a(c).velocity({bottom:"0",opacity:1},{duration:b.in_duration,queue:!1,ease:"easeOutCubic",complete:function(){"function"==typeof b.ready&&b.ready()}}):(a(c).css({top:"4%"}),a(c).velocity({top:"10%",opacity:1},{duration:b.in_duration,queue:!1,ease:"easeOutCubic",complete:function(){"function"==typeof b.ready&&b.ready()}}))}}),a.fn.extend({closeModal:function(b){var c={out_duration:250,complete:void 0},b=a.extend(c,b);a(".modal-close").off(),a(document).off("keyup.leanModal"),a("#lean-overlay").velocity({opacity:0},{duration:b.out_duration,queue:!1,ease:"easeOutQuart"}),a(this).hasClass("bottom-sheet")?a(this).velocity({bottom:"-100%",opacity:0},{duration:b.out_duration,queue:!1,ease:"easeOutCubic",complete:function(){a("#lean-overlay").css({display:"none"}),"function"==typeof b.complete&&b.complete(),a("#lean-overlay").remove()}}):a(this).fadeOut(b.out_duration,function(){a(this).css({top:0}),a("#lean-overlay").css({display:"none"}),"function"==typeof b.complete&&b.complete(),a("#lean-overlay").remove()})}}),a.fn.extend({leanModal:function(b){return this.each(function(){a(this).click(function(c){var d=a(this).attr("href")||"#"+a(this).data("target");a(d).openModal(b),c.preventDefault()})})}})}(jQuery),function(a){a.fn.materialbox=function(){return this.each(function(){function b(){d=!1;var b=g.parent(".material-placeholder"),e=(window.innerWidth,window.innerHeight,g.data("width")),h=g.data("height");g.velocity("stop",!0),a("#materialbox-overlay").velocity("stop",!0),a(".materialbox-caption").velocity("stop",!0),a("#materialbox-overlay").velocity({opacity:0},{duration:f,queue:!1,easing:"easeOutQuad",complete:function(){c=!1,a(this).remove()}}),g.velocity({width:e,height:h,left:0,top:0},{duration:f,queue:!1,easing:"easeOutQuad"}),a(".materialbox-caption").velocity({opacity:0},{duration:f,queue:!1,easing:"easeOutQuad",complete:function(){b.css({height:"",width:"",position:"",top:"",left:""}),g.css({height:"",top:"",left:"",width:"","max-width":"",position:"","z-index":""}),g.removeClass("active"),d=!0,a(this).remove()}})}if(!a(this).hasClass("intialized")){a(this).addClass("intialized");

var c=!1,d=!0,e=275,f=200,g=a(this),h=a("<div></div>").addClass("material-placeholder");g.wrap(h),g.on("click",function(){var f=g.parent(".material-placeholder"),h=window.innerWidth,i=window.innerHeight,j=g.width(),k=g.height();if(d===!1)return b(),!1;if(c&&d===!0)return b(),!1;d=!1,g.addClass("active"),c=!0,f.css({width:f[0].getBoundingClientRect().width,height:f[0].getBoundingClientRect().height,position:"relative",top:0,left:0}),g.css({position:"absolute","z-index":1e3}).data("width",j).data("height",k);var l=a('<div id="materialbox-overlay"></div>').css({opacity:0}).click(function(){d===!0&&b()});if(a("body").append(l),l.velocity({opacity:1},{duration:e,queue:!1,easing:"easeOutQuad"}),""!==g.data("caption")){var m=a('<div class="materialbox-caption"></div>');m.text(g.data("caption")),a("body").append(m),m.css({display:"inline"}),m.velocity({opacity:1},{duration:e,queue:!1,easing:"easeOutQuad"})}var n=0,o=j/h,p=k/i,q=0,r=0;o>p?(n=k/j,q=.9*h,r=.9*h*n):(n=j/k,q=.9*i*n,r=.9*i),g.hasClass("responsive-img")?g.velocity({"max-width":q,width:j},{duration:0,queue:!1,complete:function(){g.css({left:0,top:0}).velocity({height:r,width:q,left:a(document).scrollLeft()+h/2-g.parent(".material-placeholder").offset().left-q/2,top:a(document).scrollTop()+i/2-g.parent(".material-placeholder").offset().top-r/2},{duration:e,queue:!1,easing:"easeOutQuad",complete:function(){d=!0}})}}):g.css("left",0).css("top",0).velocity({height:r,width:q,left:a(document).scrollLeft()+h/2-g.parent(".material-placeholder").offset().left-q/2,top:a(document).scrollTop()+i/2-g.parent(".material-placeholder").offset().top-r/2},{duration:e,queue:!1,easing:"easeOutQuad",complete:function(){d=!0}})}),a(window).scroll(function(){c&&b()}),a(document).keyup(function(a){27===a.keyCode&&d===!0&&c&&b()})}})},a(document).ready(function(){a(".materialboxed").materialbox()})}(jQuery),function(a){a.fn.parallax=function(){var b=a(window).width();return this.each(function(){function c(c){var e;e=601>b?d.height()>0?d.height():d.children("img").height():d.height()>0?d.height():500;var f=d.children("img").first(),g=f.height(),h=g-e,i=d.offset().top+e,j=d.offset().top,k=a(window).scrollTop(),l=window.innerHeight,m=k+l,n=(m-j)/(e+l),o=Math.round(h*n);c&&f.css("display","block"),i>k&&k+l>j&&f.css("transform","translate3D(-50%,"+o+"px, 0)")}var d=a(this);d.addClass("parallax"),d.children("img").one("load",function(){c(!0)}).each(function(){this.complete&&a(this).load()}),a(window).scroll(function(){b=a(window).width(),c(!1)}),a(window).resize(function(){b=a(window).width(),c(!1)})})}}(jQuery),function(a){var b={init:function(){return this.each(function(){{var b=a(this);a(window).width()}b.width("100%");var c=a(this).children("li").length;b.children("li").each(function(){a(this).width(100/c+"%")});var d,e,f=b.find("li.tab a"),g=b.width(),h=b.find("li").first().outerWidth(),i=0;d=a(f.filter('[href="'+location.hash+'"]')),0===d.length&&(d=a(this).find("li.tab a.active").first()),0===d.length&&(d=a(this).find("li.tab a").first()),d.addClass("active"),i=f.index(d),0>i&&(i=0),e=a(d[0].hash),b.append('<div class="indicator"></div>');var j=b.find(".indicator");b.is(":visible")&&(j.css({right:g-(i+1)*h}),j.css({left:i*h})),a(window).resize(function(){g=b.width(),h=b.find("li").first().outerWidth(),0>i&&(i=0),0!==h&&0!==g&&(j.css({right:g-(i+1)*h}),j.css({left:i*h}))}),f.not(d).each(function(){a(this.hash).hide()}),b.on("click","a",function(c){g=b.width(),h=b.find("li").first().outerWidth(),d.removeClass("active"),e.hide(),d=a(this),e=a(this.hash),f=b.find("li.tab a"),d.addClass("active");var k=i;i=f.index(a(this)),0>i&&(i=0),e.show(),i-k>=0?(j.velocity({right:g-(i+1)*h},{duration:300,queue:!1,easing:"easeOutQuad"}),j.velocity({left:i*h},{duration:300,queue:!1,easing:"easeOutQuad",delay:90})):(j.velocity({left:i*h},{duration:300,queue:!1,easing:"easeOutQuad"}),j.velocity({right:g-(i+1)*h},{duration:300,queue:!1,easing:"easeOutQuad",delay:90})),c.preventDefault()})})},select_tab:function(a){this.find('a[href="#'+a+'"]').trigger("click")}};a.fn.tabs=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.tooltip"):b.init.apply(this,arguments)},a(document).ready(function(){a("ul.tabs").tabs()})}(jQuery),function(a){a.fn.tooltip=function(b){var c=null,d=!1,e=null,f=5,g={delay:350};return b=a.extend(g,b),a(".material-tooltip").remove(),this.each(function(){var g=a(this),h=a("<span></span>").text(g.attr("data-tooltip")),i=a("<div></div>");i.addClass("material-tooltip").append(h),i.appendTo(a("body"));var j=a("<div></div>").addClass("backdrop");j.appendTo(i),j.css({top:0,left:0}),a(this).off("mouseenter mouseleave"),a(this).on({mouseenter:function(){var a=g.data("delay");a=void 0==a||""==a?b.delay:a,c=0,e=setInterval(function(){if(c+=10,c>=a&&0==d){d=!0,i.css({display:"block",left:"0px",top:"0px"}),i.children("span").text(g.attr("data-tooltip"));var b=g.outerWidth(),e=g.outerHeight(),h=g.attr("data-position"),k=i.outerHeight(),l=i.outerWidth(),m="0px",n="0px",o=8;"top"===h?(i.css({top:g.offset().top-k-f,left:g.offset().left+b/2-l/2}),m="-10px",j.css({borderRadius:"14px 14px 0 0",transformOrigin:"50% 90%",marginTop:k,marginLeft:l/2-j.width()/2})):"left"===h?(i.css({top:g.offset().top+e/2-k/2,left:g.offset().left-l-f}),n="-10px",j.css({width:"14px",height:"14px",borderRadius:"14px 0 0 14px",transformOrigin:"95% 50%",marginTop:k/2,marginLeft:l})):"right"===h?(i.css({top:g.offset().top+e/2-k/2,left:g.offset().left+b+f}),n="+10px",j.css({width:"14px",height:"14px",borderRadius:"0 14px 14px 0",transformOrigin:"5% 50%",marginTop:k/2,marginLeft:"0px"})):(i.css({top:g.offset().top+g.outerHeight()+f,left:g.offset().left+b/2-l/2}),m="+10px",j.css({marginLeft:l/2-j.width()/2})),o=l/8,8>o&&(o=8),("right"===h||"left"===h)&&(o=l/10,6>o&&(o=6)),i.velocity({opacity:1,marginTop:m,marginLeft:n},{duration:350,queue:!1}),j.css({display:"block"}).velocity({opacity:1},{duration:55,delay:0,queue:!1}).velocity({scale:o},{duration:300,delay:0,queue:!1,easing:"easeInOutQuad"})}},10)},mouseleave:function(){clearInterval(e),c=0,i.velocity({opacity:0,marginTop:0,marginLeft:0},{duration:225,queue:!1,delay:275}),j.velocity({opacity:0,scale:1},{duration:225,delay:275,queue:!1,complete:function(){j.css("display","none"),i.css("display","none"),d=!1}})}})})},a(document).ready(function(){a(".tooltipped").tooltip()})}(jQuery),function(a){"use strict";function b(a){return null!==a&&a===a.window}function c(a){return b(a)?a:9===a.nodeType&&a.defaultView}function d(a){var b,d,e={top:0,left:0},f=a&&a.ownerDocument;return b=f.documentElement,"undefined"!=typeof a.getBoundingClientRect&&(e=a.getBoundingClientRect()),d=c(f),{top:e.top+d.pageYOffset-b.clientTop,left:e.left+d.pageXOffset-b.clientLeft}}function e(a){var b="";for(var c in a)a.hasOwnProperty(c)&&(b+=c+":"+a[c]+";");return b}function f(a){if(k.allowEvent(a)===!1)return null;for(var b=null,c=a.target||a.srcElement;null!==c.parentElement;){if(!(c instanceof SVGElement||-1===c.className.indexOf("waves-effect"))){b=c;break}if(c.classList.contains("waves-effect")){b=c;break}c=c.parentElement}return b}function g(b){var c=f(b);null!==c&&(j.show(b,c),"ontouchstart"in a&&(c.addEventListener("touchend",j.hide,!1),c.addEventListener("touchcancel",j.hide,!1)),c.addEventListener("mouseup",j.hide,!1),c.addEventListener("mouseleave",j.hide,!1))}var h=h||{},i=document.querySelectorAll.bind(document),j={duration:750,show:function(a,b){if(2===a.button)return!1;var c=b||this,f=document.createElement("div");f.className="waves-ripple",c.appendChild(f);var g=d(c),h=a.pageY-g.top,i=a.pageX-g.left,k="scale("+c.clientWidth/100*10+")";"touches"in a&&(h=a.touches[0].pageY-g.top,i=a.touches[0].pageX-g.left),f.setAttribute("data-hold",Date.now()),f.setAttribute("data-scale",k),f.setAttribute("data-x",i),f.setAttribute("data-y",h);var l={top:h+"px",left:i+"px"};f.className=f.className+" waves-notransition",f.setAttribute("style",e(l)),f.className=f.className.replace("waves-notransition",""),l["-webkit-transform"]=k,l["-moz-transform"]=k,l["-ms-transform"]=k,l["-o-transform"]=k,l.transform=k,l.opacity="1",l["-webkit-transition-duration"]=j.duration+"ms",l["-moz-transition-duration"]=j.duration+"ms",l["-o-transition-duration"]=j.duration+"ms",l["transition-duration"]=j.duration+"ms",l["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",f.setAttribute("style",e(l))},hide:function(a){k.touchup(a);var b=this,c=(1.4*b.clientWidth,null),d=b.getElementsByClassName("waves-ripple");if(!(d.length>0))return!1;c=d[d.length-1];var f=c.getAttribute("data-x"),g=c.getAttribute("data-y"),h=c.getAttribute("data-scale"),i=Date.now()-Number(c.getAttribute("data-hold")),l=350-i;0>l&&(l=0),setTimeout(function(){var a={top:g+"px",left:f+"px",opacity:"0","-webkit-transition-duration":j.duration+"ms","-moz-transition-duration":j.duration+"ms","-o-transition-duration":j.duration+"ms","transition-duration":j.duration+"ms","-webkit-transform":h,"-moz-transform":h,"-ms-transform":h,"-o-transform":h,transform:h};c.setAttribute("style",e(a)),setTimeout(function(){try{b.removeChild(c)}catch(a){return!1}},j.duration)},l)},wrapInput:function(a){for(var b=0;b<a.length;b++){var c=a[b];if("input"===c.tagName.toLowerCase()){var d=c.parentNode;if("i"===d.tagName.toLowerCase()&&-1!==d.className.indexOf("waves-effect"))continue;var e=document.createElement("i");e.className=c.className+" waves-input-wrapper";var f=c.getAttribute("style");f||(f=""),e.setAttribute("style",f),c.className="waves-button-input",c.removeAttribute("style"),d.replaceChild(e,c),e.appendChild(c)}}}},k={touches:0,allowEvent:function(a){var b=!0;return"touchstart"===a.type?k.touches+=1:"touchend"===a.type||"touchcancel"===a.type?setTimeout(function(){k.touches>0&&(k.touches-=1)},500):"mousedown"===a.type&&k.touches>0&&(b=!1),b},touchup:function(a){k.allowEvent(a)}};h.displayEffect=function(b){b=b||{},"duration"in b&&(j.duration=b.duration),j.wrapInput(i(".waves-effect")),"ontouchstart"in a&&document.body.addEventListener("touchstart",g,!1),document.body.addEventListener("mousedown",g,!1)},h.attach=function(b){"input"===b.tagName.toLowerCase()&&(j.wrapInput([b]),b=b.parentElement),"ontouchstart"in a&&b.addEventListener("touchstart",g,!1),b.addEventListener("mousedown",g,!1)},a.Waves=h,document.addEventListener("DOMContentLoaded",function(){h.displayEffect()},!1)}(window),Materialize.toast=function(a,b,c,d){function e(a){var b=document.createElement("div");if(b.classList.add("toast"),c)for(var e=c.split(" "),f=0,g=e.length;g>f;f++)b.classList.add(e[f]);b.innerHTML=a;var h=new Hammer(b,{prevent_default:!1});return h.on("pan",function(a){var c=a.deltaX,d=80;b.classList.contains("panning")||b.classList.add("panning");var e=1-Math.abs(c/d);0>e&&(e=0),Vel(b,{left:c,opacity:e},{duration:50,queue:!1,easing:"easeOutQuad"})}),h.on("panend",function(a){var c=a.deltaX,e=80;Math.abs(c)>e?Vel(b,{marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){"function"==typeof d&&d(),b.parentNode.removeChild(b)}}):(b.classList.remove("panning"),Vel(b,{left:0,opacity:1},{duration:300,easing:"easeOutExpo",queue:!1}))}),b}c=c||"";var f=document.getElementById("toast-container");if(null===f){var f=document.createElement("div");f.id="toast-container",document.body.appendChild(f)}var g=e(a);f.appendChild(g),g.style.top="35px",g.style.opacity=0,Vel(g,{top:"0px",opacity:1},{duration:300,easing:"easeOutCubic",queue:!1});var h=b,i=setInterval(function(){null===g.parentNode&&window.clearInterval(i),g.classList.contains("panning")||(h-=20),0>=h&&(Vel(g,{opacity:0,marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){"function"==typeof d&&d(),this[0].parentNode.removeChild(this[0])}}),window.clearInterval(i))},20)},function(a){var b={init:function(b){var c={menuWidth:240,edge:"left",closeOnClick:!1};b=a.extend(c,b),a(this).each(function(){function c(c){f=!1,g=!1,a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),"left"===b.edge?(a(".drag-target").css({width:"",right:"",left:"0"}),e.velocity({left:-1*(b.menuWidth+10)},{duration:200,queue:!1,easing:"easeOutCubic",complete:function(){1==c&&(e.removeAttr("style"),e.css("width",b.menuWidth))}})):(a(".drag-target").css({width:"",right:"0",left:""}),e.velocity({right:-1*(b.menuWidth+10)},{duration:200,queue:!1,easing:"easeOutCubic",complete:function(){1==c&&(e.removeAttr("style"),e.css("width",b.menuWidth))}}))}var d=a(this),e=a("#"+d.attr("data-activates"));240!=b.menuWidth&&e.css("width",b.menuWidth),a("body").append(a('<div class="drag-target"></div>')),"left"==b.edge?(e.css("left",-1*(b.menuWidth+10)),a(".drag-target").css({left:0})):(e.addClass("right-aligned").css("right",-1*(b.menuWidth+10)).css("left",""),a(".drag-target").css({right:0})),e.hasClass("fixed")&&a(window).width()>992&&e.css("left",0),e.hasClass("fixed")&&a(window).resize(function(){window.innerWidth>992?0!=a("#sidenav-overlay").css("opacity")&&g?c(!0):(e.removeAttr("style"),e.css("width",b.menuWidth)):g===!1&&("left"===b.edge?e.css("left",-1*(b.menuWidth+10)):e.css("right",-1*(b.menuWidth+10)))}),1==b.closeOnClick&&e.on("click.itemclick","a:not(.collapsible-header)",function(){c()});var f=!1,g=!1;a(".drag-target").on("click",function(){c()}),a(".drag-target").hammer({prevent_default:!1}).bind("pan",function(d){if("touch"==d.gesture.pointerType){{var f=(d.gesture.direction,d.gesture.center.x);d.gesture.center.y,d.gesture.velocityX}if(0===a("#sidenav-overlay").length){var h=a('<div id="sidenav-overlay"></div>');h.css("opacity",0).click(function(){c()}),a("body").append(h)}if("left"===b.edge&&(f>b.menuWidth?f=b.menuWidth:0>f&&(f=0)),"left"===b.edge)f<b.menuWidth/2?g=!1:f>=b.menuWidth/2&&(g=!0),e.css("left",f-b.menuWidth);else{f<a(window).width()-b.menuWidth/2?g=!0:f>=a(window).width()-b.menuWidth/2&&(g=!1);var i=-1*(f-b.menuWidth/2);i>0&&(i=0),e.css("right",i)}if("left"===b.edge){var j=f/b.menuWidth;a("#sidenav-overlay").velocity({opacity:j},{duration:50,queue:!1,easing:"easeOutQuad"})}else{var j=Math.abs((f-a(window).width())/b.menuWidth);a("#sidenav-overlay").velocity({opacity:j},{duration:50,queue:!1,easing:"easeOutQuad"})}}}).bind("panend",function(c){if("touch"==c.gesture.pointerType){var d=c.gesture.velocityX;f=!1,"left"===b.edge?g&&.3>=d||-.5>d?(e.velocity({left:0},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),a(".drag-target").css({width:"50%",right:0,left:""})):(!g||d>.3)&&(e.velocity({left:-1*(b.menuWidth+10)},{duration:200,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),a(".drag-target").css({width:"10px",right:"",left:0})):g&&d>=-.3||d>.5?(e.velocity({right:0},{duration:300,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:1},{duration:50,queue:!1,easing:"easeOutQuad"}),a(".drag-target").css({width:"50%",right:"",left:0})):(!g||-.3>d)&&(e.velocity({right:-1*(b.menuWidth+10)},{duration:200,queue:!1,easing:"easeOutQuad"}),a("#sidenav-overlay").velocity({opacity:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}}),a(".drag-target").css({width:"10px",right:0,left:""}))}}),d.click(function(){if(1==g)g=!1,f=!1,c();else{"left"===b.edge?(a(".drag-target").css({width:"50%",right:0,left:""}),e.velocity({left:0},{duration:300,queue:!1,easing:"easeOutQuad"})):(a(".drag-target").css({width:"50%",right:"",left:0}),e.velocity({right:0},{duration:300,queue:!1,easing:"easeOutQuad"}),e.css("left",""));var d=a('<div id="sidenav-overlay"></div>');d.css("opacity",0).click(function(){g=!1,f=!1,c(),d.velocity({opacity:0},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){a(this).remove()}})}),a("body").append(d),d.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){g=!0,f=!1}})}return!1})})},show:function(){this.trigger("click")},hide:function(){a("#sidenav-overlay").trigger("click")}};a.fn.sideNav=function(c){return b[c]?b[c].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof c&&c?void a.error("Method "+c+" does not exist on jQuery.tooltip"):b.init.apply(this,arguments)}}(jQuery),function(a){function b(b,c,d,e){var f=a();return a.each(g,function(a,g){if(g.height()>0){var h=g.offset().top,i=g.offset().left,j=i+g.width(),k=h+g.height(),l=!(i>c||e>j||h>d||b>k);l&&f.push(g)}}),f}function c(){++j;var c=f.scrollTop(),d=f.scrollLeft(),e=d+f.width(),g=c+f.height(),i=b(c+k.top+200,e+k.right,g+k.bottom,d+k.left);a.each(i,function(a,b){var c=b.data("scrollSpy:ticks");"number"!=typeof c&&b.triggerHandler("scrollSpy:enter"),b.data("scrollSpy:ticks",j)}),a.each(h,function(a,b){var c=b.data("scrollSpy:ticks");"number"==typeof c&&c!==j&&(b.triggerHandler("scrollSpy:exit"),b.data("scrollSpy:ticks",null))}),h=i}function d(){f.trigger("scrollSpy:winSize")}function e(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:l(),g=null,f=a.apply(d,e),d=e=null};return function(){var j=l();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e),d=e=null):g||c.trailing===!1||(g=setTimeout(i,k)),f}}var f=a(window),g=[],h=[],i=!1,j=0,k={top:0,right:0,bottom:0,left:0},l=Date.now||function(){return(new Date).getTime()};a.scrollSpy=function(b,d){var h=[];b=a(b),b.each(function(b,c){g.push(a(c)),a(c).data("scrollSpy:id",b),a("a[href=#"+a(c).attr("id")+"]").click(function(b){b.preventDefault();var c=a(this.hash).offset().top+1;a("html, body").animate({scrollTop:c-200},{duration:400,queue:!1,easing:"easeOutCubic"})})}),d=d||{throttle:100},k.top=d.offsetTop||0,k.right=d.offsetRight||0,k.bottom=d.offsetBottom||0,k.left=d.offsetLeft||0;var j=e(c,d.throttle||100),l=function(){a(document).ready(j)};return i||(f.on("scroll",l),f.on("resize",l),i=!0),setTimeout(l,0),b.on("scrollSpy:enter",function(){h=a.grep(h,function(a){return 0!=a.height()});var b=a(this);h[0]?(a("a[href=#"+h[0].attr("id")+"]").removeClass("active"),b.data("scrollSpy:id")<h[0].data("scrollSpy:id")?h.unshift(a(this)):h.push(a(this))):h.push(a(this)),a("a[href=#"+h[0].attr("id")+"]").addClass("active")}),b.on("scrollSpy:exit",function(){if(h=a.grep(h,function(a){return 0!=a.height()}),h[0]){a("a[href=#"+h[0].attr("id")+"]").removeClass("active");var b=a(this);h=a.grep(h,function(a){return a.attr("id")!=b.attr("id")}),h[0]&&a("a[href=#"+h[0].attr("id")+"]").addClass("active")}}),b},a.winSizeSpy=function(b){return a.winSizeSpy=function(){return f},b=b||{throttle:100},f.on("resize",e(d,b.throttle||100))},a.fn.scrollSpy=function(b){return a.scrollSpy(a(this),b)}}(jQuery),function(a){a(document).ready(function(){function b(b){d.text(b.val()+"\n");var c=d.html().replace(/\n/g,"<br>");d.html(c),b.is(":visible")?d.css("width",b.width()):d.css("width",a(window).width()/2),b.css("height",d.height())}Materialize.updateTextFields=function(){var b="input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";a(b).each(function(b,c){a(c).val().length>0||void 0!==a(this).attr("placeholder")?a(this).siblings("label, i").addClass("active"):a(this).siblings("label, i").removeClass("active")})};var c="input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea";a("input[autofocus]").siblings("label, i").addClass("active"),a(document).on("change",c,function(){(0!==a(this).val().length||void 0!==a(this).attr("placeholder"))&&a(this).siblings("label, i").addClass("active"),validate_field(a(this))}),a(document).ready(function(){Materialize.updateTextFields()}),a(document).on("reset",function(b){a(b.target).is("form")&&(a(this).find(c).removeClass("valid").removeClass("invalid"),a(this).find(c).siblings("label, i").removeClass("active"),a(this).find("select.initialized").each(function(){var b=a(this).find("option[selected]").text();a(this).siblings("input.select-dropdown").val(b)}))}),a(document).on("focus",c,function(){a(this).siblings("label, i").addClass("active")}),a(document).on("blur",c,function(){0===a(this).val().length&&void 0===a(this).attr("placeholder")&&a(this).siblings("label, i").removeClass("active"),validate_field(a(this))}),validate_field=function(a){0===a.val().length?a.hasClass("validate")&&(a.removeClass("valid"),a.removeClass("invalid")):a.hasClass("validate")&&(a.is(":valid")?(a.removeClass("invalid"),a.addClass("valid")):(a.removeClass("valid"),a.addClass("invalid")))};var d=a(".hiddendiv").first();d.length||(d=a('<div class="hiddendiv common"></div>'),a("body").append(d));var e=".materialize-textarea";a(e).each(function(){var c=a(this);c.val().length&&b(c)}),a("body").on("keyup keydown",e,function(){b(a(this))}),a(".file-field").each(function(){var b=a(this).find("input.file-path");a(this).find('input[type="file"]').change(function(){b.val(a(this)[0].files[0].name),b.trigger("change")})});var f="input[type=range]",g=!1;a(f).each(function(){var b=a('<span class="thumb"><span class="value"></span></span>');a(this).after(b)});var h=".range-field";a(document).on("mousedown",h,function(b){var c=a(this).children(".thumb");c.length<=0&&(c=a('<span class="thumb"><span class="value"></span></span>'),a(this).append(c)),g=!0,a(this).addClass("active"),c.hasClass("active")||c.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"});var d=b.pageX-a(this).offset().left,e=a(this).outerWidth();0>d?d=0:d>e&&(d=e),c.addClass("active").css("left",d),c.find(".value").html(a(this).children("input[type=range]").val())}),a(document).on("mouseup",h,function(){g=!1,a(this).removeClass("active")}),a(document).on("mousemove",h,function(b){var c=a(this).children(".thumb");if(g){c.hasClass("active")||c.velocity({height:"30px",width:"30px",top:"-20px",marginLeft:"-15px"},{duration:300,easing:"easeOutExpo"});var d=b.pageX-a(this).offset().left,e=a(this).outerWidth();0>d?d=0:d>e&&(d=e),c.addClass("active").css("left",d),c.find(".value").html(a(this).children("input[type=range]").val())}}),a(document).on("mouseout",h,function(){if(!g){var b=a(this).children(".thumb");b.hasClass("active")&&b.velocity({height:"0",width:"0",top:"10px",marginLeft:"-6px"},{duration:100}),b.removeClass("active")}})}),a.fn.material_select=function(b){a(this).each(function(){if($select=a(this),!$select.hasClass("browser-default")){var c=$select.data("select-id");if(c&&($select.parent().find("i").remove(),$select.parent().find("input").remove(),$select.unwrap(),a("ul#select-options-"+c).remove()),"destroy"===b)return void $select.data("select-id",null).removeClass("initialized");var d=Materialize.guid();$select.data("select-id",d);var e=a('<div class="select-wrapper"></div>');e.addClass($select.attr("class"));var f=a('<ul id="select-options-'+d+'" class="dropdown-content select-dropdown"></ul>'),g=$select.children("option");if(void 0!==$select.find("option:selected"))var h=$select.find("option:selected");else var h=f.first();g.each(function(){f.append(a('<li class="'+(a(this).is(":disabled")?"disabled":"")+'"><span>'+a(this).html()+"</span></li>"))}),f.find("li").each(function(c){var d=$select;a(this).click(function(){a(this).hasClass("disabled")||(d.find("option").eq(c).prop("selected",!0),d.trigger("change"),d.siblings("input.select-dropdown").val(a(this).text()),"undefined"!=typeof b&&b())})}),$select.wrap(e);var i=a('<i class="mdi-navigation-arrow-drop-down"></i>');$select.is(":disabled")&&i.addClass("disabled");var j=a('<input type="text" class="select-dropdown" readonly="true" '+($select.is(":disabled")?"disabled":"")+' data-activates="select-options-'+d+'" value="'+h.html()+'"/>');$select.before(j),j.before(i),a("body").append(f),$select.is(":disabled")||j.dropdown({hover:!1}),$select.attr("tabindex")&&a(j[0]).attr("tabindex",$select.attr("tabindex")),$select.addClass("initialized"),j.on("focus",function(){a(this).trigger("open"),h=a(this).val(),selectedOption=f.find("li").filter(function(){return a(this).text().toLowerCase()===h.toLowerCase()})[0],activateOption(f,selectedOption)}),j.on("blur",function(){a(this).trigger("close")}),activateOption=function(b,c){b.find("li.active").removeClass("active"),a(c).addClass("active"),b.scrollTo(c)},filterQuery=[],onKeyDown=function(b){return 9==b.which?void j.trigger("close"):40!=b.which||f.is(":visible")?void((13!=b.which||f.is(":visible"))&&(b.preventDefault(),letter=String.fromCharCode(b.which).toLowerCase(),letter&&(filterQuery.push(letter),string=filterQuery.join(""),newOption=f.find("li").filter(function(){return 0===a(this).text().toLowerCase().indexOf(string)})[0],newOption&&activateOption(f,newOption)),13==b.which&&(activeOption=f.find("li.active:not(.disabled)")[0],activeOption&&(a(activeOption).trigger("click"),j.trigger("close"))),40==b.which&&(newOption=f.find("li.active").next("li:not(.disabled)")[0],newOption&&activateOption(f,newOption)),27==b.which&&j.trigger("close"),38==b.which&&(newOption=f.find("li.active").prev("li:not(.disabled)")[0],newOption&&activateOption(f,newOption)),setTimeout(function(){filterQuery=[]},1e3))):void j.trigger("open")},j.on("keydown",onKeyDown)}})}}(jQuery),function(a){a.fn.slider=function(b){var c={indicators:!0,height:400,transition:500,interval:6e3};return b=a.extend(c,b),this.each(function(){function c(a,b){a.hasClass("center-align")?a.velocity({opacity:0,translateY:-100},{duration:b,queue:!1}):a.hasClass("right-align")?a.velocity({opacity:0,translateX:100},{duration:b,queue:!1}):a.hasClass("left-align")&&a.velocity({opacity:0,translateX:-100},{duration:b,queue:!1})}function d(a){a>=h.length?a=0:0>a&&(a=h.length-1),i=g.find(".active").index(),i!=a&&(e=h.eq(i),$caption=e.find(".caption"),e.removeClass("active"),e.velocity({opacity:0},{duration:b.transition,queue:!1,easing:"easeOutQuad",complete:function(){h.not(".active").velocity({opacity:0,translateX:0,translateY:0},{duration:0,queue:!1})}}),c($caption,b.transition),b.indicators&&j.eq(i).removeClass("active"),h.eq(a).velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),h.eq(a).find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,delay:b.transition,queue:!1,easing:"easeOutQuad"}),h.eq(a).addClass("active"),b.indicators&&j.eq(a).addClass("active"))}var e,f=a(this),g=f.find("ul.slides").first(),h=g.find("li"),i=g.find(".active").index();if(-1!=i&&(e=h.eq(i)),400!=b.height&&(f.height(b.height+40),g.height(b.height)),h.find(".caption").each(function(){c(a(this),0)}),h.find("img").each(function(){a(this).css("background-image","url("+a(this).attr("src")+")"),a(this).attr("src","data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")}),b.indicators){var j=a('<ul class="indicators"></ul>');h.each(function(){var c=a('<li class="indicator-item"></li>');c.click(function(){var c=g.parent(),e=c.find(a(this)).index();d(e),clearInterval($interval),$interval=setInterval(function(){i=g.find(".active").index(),h.length==i+1?i=0:i+=1,d(i)},b.transition+b.interval)}),j.append(c)}),f.append(j),j=f.find("ul.indicators").find("li.indicator-item")}e?e.show():(h.first().addClass("active").velocity({opacity:1},{duration:b.transition,queue:!1,easing:"easeOutQuad"}),i=0,e=h.eq(i),b.indicators&&j.eq(i).addClass("active")),e.find("img").each(function(){e.find(".caption").velocity({opacity:1,translateX:0,translateY:0},{duration:b.transition,queue:!1,easing:"easeOutQuad"})}),$interval=setInterval(function(){i=g.find(".active").index(),d(i+1)},b.transition+b.interval);var k=!1,l=!1,m=!1;f.hammer({prevent_default:!1}).bind("pan",function(a){if("touch"===a.gesture.pointerType){clearInterval($interval);var b=a.gesture.direction,c=a.gesture.deltaX,d=a.gesture.velocityX;$curr_slide=g.find(".active"),$curr_slide.velocity({translateX:c},{duration:50,queue:!1,easing:"easeOutQuad"}),4===b&&(c>f.innerWidth()/2||-.65>d)?m=!0:2===b&&(c<-1*f.innerWidth()/2||d>.65)&&(l=!0);var e;l&&(e=$curr_slide.next(),0===e.length&&(e=h.first()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"})),m&&(e=$curr_slide.prev(),0===e.length&&(e=h.last()),e.velocity({opacity:1},{duration:300,queue:!1,easing:"easeOutQuad"}))}}).bind("panend",function(a){"touch"===a.gesture.pointerType&&($curr_slide=g.find(".active"),k=!1,curr_index=g.find(".active").index(),m||l?l?(d(curr_index+1),$curr_slide.velocity({translateX:-1*f.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1})}})):m&&(d(curr_index-1),$curr_slide.velocity({translateX:f.innerWidth()},{duration:300,queue:!1,easing:"easeOutQuad",complete:function(){$curr_slide.velocity({opacity:0,translateX:0},{duration:0,queue:!1})}})):$curr_slide.velocity({translateX:0},{duration:300,queue:!1,easing:"easeOutQuad"}),l=!1,m=!1,clearInterval($interval),$interval=setInterval(function(){i=g.find(".active").index(),h.length==i+1?i=0:i+=1,d(i)},b.transition+b.interval))})})}}(jQuery),function(a){a(document).ready(function(){a(document).on("click.card",".card",function(b){a(this).find(".card-reveal").length&&(a(b.target).is(a(".card-reveal .card-title"))||a(b.target).is(a(".card-reveal .card-title i"))?a(this).find(".card-reveal").velocity({translateY:0},{duration:225,queue:!1,easing:"easeInOutQuad",complete:function(){a(this).css({display:"none"})}}):(a(b.target).is(a(".card .activator"))||a(b.target).is(a(".card .activator i")))&&a(this).find(".card-reveal").css({display:"block"}).velocity("stop",!1).velocity({translateY:"-100%"},{duration:300,queue:!1,easing:"easeInOutQuad"}))})})}(jQuery),function(a){a(document).ready(function(){a.fn.pushpin=function(b){var c={top:0,bottom:1/0,offset:0};return b=a.extend(c,b),$index=0,this.each(function(){function c(a){a.removeClass("pin-top"),a.removeClass("pinned"),a.removeClass("pin-bottom")}function d(d,e){d.each(function(){b.top<=e&&b.bottom>=e&&!a(this).hasClass("pinned")&&(c(a(this)),a(this).css("top",b.offset),a(this).addClass("pinned")),e<b.top&&!a(this).hasClass("pin-top")&&(c(a(this)),a(this).css("top",0),a(this).addClass("pin-top")),e>b.bottom&&!a(this).hasClass("pin-bottom")&&(c(a(this)),a(this).addClass("pin-bottom"),a(this).css("top",b.bottom-g))})}var e=Materialize.guid(),f=a(this),g=a(this).offset().top;d(f,a(window).scrollTop()),a(window).on("scroll."+e,function(){var c=a(window).scrollTop()+b.offset;d(f,c)})})}})}(jQuery),function(a){a(document).ready(function(){a.fn.reverse=[].reverse,a(document).on("mouseenter.fixedActionBtn",".fixed-action-btn",function(){var b=a(this);b.find("ul .btn-floating").velocity({scaleY:".4",scaleX:".4",translateY:"40px"},{duration:0});var c=0;b.find("ul .btn-floating").reverse().each(function(){a(this).velocity({opacity:"1",scaleX:"1",scaleY:"1",translateY:"0"},{duration:80,delay:c}),c+=40})}),a(document).on("mouseleave.fixedActionBtn",".fixed-action-btn",function(){var b=a(this);b.find("ul .btn-floating").velocity("stop",!0),b.find("ul .btn-floating").velocity({opacity:"0",scaleX:".4",scaleY:".4",translateY:"40px"},{duration:80})})})}(jQuery),function(a){Materialize.fadeInImage=function(b){var c=a(b);c.css({opacity:0}),a(c).velocity({opacity:1},{duration:650,queue:!1,easing:"easeOutSine"}),a(c).velocity({opacity:1},{duration:1300,queue:!1,easing:"swing",step:function(b,c){c.start=100;var d=b/100,e=150-(100-b)/1.75;100>e&&(e=100),b>=0&&a(this).css({"-webkit-filter":"grayscale("+d+")brightness("+e+"%)",filter:"grayscale("+d+")brightness("+e+"%)"})}})},Materialize.showStaggeredList=function(b){var c=0;a(b).find("li").velocity({translateX:"-100px"
},{duration:0}),a(b).find("li").each(function(){a(this).velocity({opacity:"1",translateX:"0"},{duration:800,delay:c,easing:[60,10]}),c+=120})},a(document).ready(function(){var b=!1,c=!1;a(".dismissable").each(function(){a(this).hammer({prevent_default:!1}).bind("pan",function(d){if("touch"===d.gesture.pointerType){var e=a(this),f=d.gesture.direction,g=d.gesture.deltaX,h=d.gesture.velocityX;e.velocity({translateX:g},{duration:50,queue:!1,easing:"easeOutQuad"}),4===f&&(g>e.innerWidth()/2||-.75>h)?b=!0:2===f&&(g<-1*e.innerWidth()/2||h>.75)&&(c=!0)}}).bind("panend",function(d){if("touch"===d.gesture.pointerType){var e=a(this);if(b||c){var f;f=b?e.innerWidth():-1*e.innerWidth(),e.velocity({translateX:f},{duration:100,queue:!1,easing:"easeOutQuad",complete:function(){e.css("border","none"),e.velocity({height:0,padding:0},{duration:200,queue:!1,easing:"easeOutQuad",complete:function(){e.remove()}})}})}else e.velocity({translateX:0},{duration:100,queue:!1,easing:"easeOutQuad"});b=!1,c=!1}})})})}(jQuery),function(){Materialize.scrollFire=function(a){var b=!1;window.addEventListener("scroll",function(){b=!0}),setInterval(function(){if(b){b=!1;for(var c=window.pageYOffset+window.innerHeight,d=0;d<a.length;d++){var e=a[d],f=e.selector,g=e.offset,h=e.callback,i=document.querySelector(f);if(null!==i){var j=i.getBoundingClientRect().top+document.body.scrollTop;if(c>j+g&&1!=e.done){var k=new Function(h);k(),e.done=!0}}}}},100)}}(jQuery),function(a){"function"==typeof define&&define.amd?define("picker",["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):this.Picker=a(jQuery)}(function(a){function b(f,g,i,l){function m(){return b._.node("div",b._.node("div",b._.node("div",b._.node("div",y.component.nodes(t.open),v.box),v.wrap),v.frame),v.holder)}function n(){w.data(g,y).addClass(v.input).attr("tabindex",-1).val(w.data("value")?y.get("select",u.format):f.value),u.editable||w.on("focus."+t.id+" click."+t.id,function(a){a.preventDefault(),y.$root[0].focus()}).on("keydown."+t.id,q),e(f,{haspopup:!0,expanded:!1,readonly:!1,owns:f.id+"_root"})}function o(){y.$root.on({keydown:q,focusin:function(a){y.$root.removeClass(v.focused),a.stopPropagation()},"mousedown click":function(b){var c=b.target;c!=y.$root.children()[0]&&(b.stopPropagation(),"mousedown"!=b.type||a(c).is("input, select, textarea, button, option")||(b.preventDefault(),y.$root[0].focus()))}}).on({focus:function(){w.addClass(v.target)},blur:function(){w.removeClass(v.target)}}).on("focus.toOpen",r).on("click","[data-pick], [data-nav], [data-clear], [data-close]",function(){var b=a(this),c=b.data(),d=b.hasClass(v.navDisabled)||b.hasClass(v.disabled),e=h();e=e&&(e.type||e.href),(d||e&&!a.contains(y.$root[0],e))&&y.$root[0].focus(),!d&&c.nav?y.set("highlight",y.component.item.highlight,{nav:c.nav}):!d&&"pick"in c?y.set("select",c.pick):c.clear?y.clear().close(!0):c.close&&y.close(!0)}),e(y.$root[0],"hidden",!0)}function p(){var b;u.hiddenName===!0?(b=f.name,f.name=""):(b=["string"==typeof u.hiddenPrefix?u.hiddenPrefix:"","string"==typeof u.hiddenSuffix?u.hiddenSuffix:"_submit"],b=b[0]+f.name+b[1]),y._hidden=a('<input type=hidden name="'+b+'"'+(w.data("value")||f.value?' value="'+y.get("select",u.formatSubmit)+'"':"")+">")[0],w.on("change."+t.id,function(){y._hidden.value=f.value?y.get("select",u.formatSubmit):""}),u.container?a(u.container).append(y._hidden):w.after(y._hidden)}function q(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(y.close(),!1):void((32==b||c||!t.open&&y.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?y.clear().close():y.open()))}function r(a){a.stopPropagation(),"focus"==a.type&&y.$root.addClass(v.focused),y.open()}if(!f)return b;var s=!1,t={id:f.id||"P"+Math.abs(~~(Math.random()*new Date))},u=i?a.extend(!0,{},i.defaults,l):l||{},v=a.extend({},b.klasses(),u.klass),w=a(f),x=function(){return this.start()},y=x.prototype={constructor:x,$node:w,start:function(){return t&&t.start?y:(t.methods={},t.start=!0,t.open=!1,t.type=f.type,f.autofocus=f==h(),f.readOnly=!u.editable,f.id=f.id||t.id,"text"!=f.type&&(f.type="text"),y.component=new i(y,u),y.$root=a(b._.node("div",m(),v.picker,'id="'+f.id+'_root" tabindex="0"')),o(),u.formatSubmit&&p(),n(),u.container?a(u.container).append(y.$root):w.after(y.$root),y.on({start:y.component.onStart,render:y.component.onRender,stop:y.component.onStop,open:y.component.onOpen,close:y.component.onClose,set:y.component.onSet}).on({start:u.onStart,render:u.onRender,stop:u.onStop,open:u.onOpen,close:u.onClose,set:u.onSet}),s=c(y.$root.children()[0]),f.autofocus&&y.open(),y.trigger("start").trigger("render"))},render:function(a){return a?y.$root.html(m()):y.$root.find("."+v.box).html(y.component.nodes(t.open)),y.trigger("render")},stop:function(){return t.start?(y.close(),y._hidden&&y._hidden.parentNode.removeChild(y._hidden),y.$root.remove(),w.removeClass(v.input).removeData(g),setTimeout(function(){w.off("."+t.id)},0),f.type=t.type,f.readOnly=!1,y.trigger("stop"),t.methods={},t.start=!1,y):y},open:function(c){return t.open?y:(w.addClass(v.active),e(f,"expanded",!0),setTimeout(function(){y.$root.addClass(v.opened),e(y.$root[0],"hidden",!1)},0),c!==!1&&(t.open=!0,s&&k.css("overflow","hidden").css("padding-right","+="+d()),y.$root[0].focus(),j.on("click."+t.id+" focusin."+t.id,function(a){var b=a.target;b!=f&&b!=document&&3!=a.which&&y.close(b===y.$root.children()[0])}).on("keydown."+t.id,function(c){var d=c.keyCode,e=y.component.key[d],f=c.target;27==d?y.close(!0):f!=y.$root[0]||!e&&13!=d?a.contains(y.$root[0],f)&&13==d&&(c.preventDefault(),f.click()):(c.preventDefault(),e?b._.trigger(y.component.key.go,y,[b._.trigger(e)]):y.$root.find("."+v.highlighted).hasClass(v.disabled)||y.set("select",y.component.item.highlight).close())})),y.trigger("open"))},close:function(a){return a&&(y.$root.off("focus.toOpen")[0].focus(),setTimeout(function(){y.$root.on("focus.toOpen",r)},0)),w.removeClass(v.active),e(f,"expanded",!1),setTimeout(function(){y.$root.removeClass(v.opened+" "+v.focused),e(y.$root[0],"hidden",!0)},0),t.open?(t.open=!1,s&&k.css("overflow","").css("padding-right","-="+d()),j.off("."+t.id),y.trigger("close")):y},clear:function(a){return y.set("clear",null,a)},set:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(d=g&&a.isPlainObject(c)?c:d||{},b){g||(h[b]=c);for(e in h)f=h[e],e in y.component.item&&(void 0===f&&(f=null),y.component.set(e,f,d)),("select"==e||"clear"==e)&&w.val("clear"==e?"":y.get(e,u.format)).trigger("change");y.render()}return d.muted?y:y.trigger("set",h)},get:function(a,c){if(a=a||"value",null!=t[a])return t[a];if("valueSubmit"==a){if(y._hidden)return y._hidden.value;a="value"}if("value"==a)return f.value;if(a in y.component.item){if("string"==typeof c){var d=y.component.get(a);return d?b._.trigger(y.component.formats.toString,y.component,[c,d]):""}return y.component.get(a)}},on:function(b,c,d){var e,f,g=a.isPlainObject(b),h=g?b:{};if(b){g||(h[b]=c);for(e in h)f=h[e],d&&(e="_"+e),t.methods[e]=t.methods[e]||[],t.methods[e].push(f)}return y},off:function(){var a,b,c=arguments;for(a=0,namesCount=c.length;a<namesCount;a+=1)b=c[a],b in t.methods&&delete t.methods[b];return y},trigger:function(a,c){var d=function(a){var d=t.methods[a];d&&d.map(function(a){b._.trigger(a,y,[c])})};return d("_"+a),d(a),y}};return new x}function c(a){var b,c="position";return a.currentStyle?b=a.currentStyle[c]:window.getComputedStyle&&(b=getComputedStyle(a)[c]),"fixed"==b}function d(){if(k.height()<=i.height())return 0;var b=a('<div style="visibility:hidden;width:100px" />').appendTo("body"),c=b[0].offsetWidth;b.css("overflow","scroll");var d=a('<div style="width:100%" />').appendTo(b),e=d[0].offsetWidth;return b.remove(),c-e}function e(b,c,d){if(a.isPlainObject(c))for(var e in c)f(b,e,c[e]);else f(b,c,d)}function f(a,b,c){a.setAttribute(("role"==b?"":"aria-")+b,c)}function g(b,c){a.isPlainObject(b)||(b={attribute:c}),c="";for(var d in b){var e=("role"==d?"":"aria-")+d,f=b[d];c+=null==f?"":e+'="'+b[d]+'"'}return c}function h(){try{return document.activeElement}catch(a){}}var i=a(window),j=a(document),k=a(document.documentElement);return b.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",target:a+"__input--target",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"}},b._={group:function(a){for(var c,d="",e=b._.trigger(a.min,a);e<=b._.trigger(a.max,a,[e]);e+=a.i)c=b._.trigger(a.item,a,[e]),d+=b._.node(a.node,c[0],c[1],c[2]);return d},node:function(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):""},lead:function(a){return(10>a?"0":"")+a},trigger:function(a,b,c){return"function"==typeof a?a.apply(b,c||[]):a},digits:function(a){return/\d/.test(a[1])?2:1},isDate:function(a){return{}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate())},isInteger:function(a){return{}.toString.call(a).indexOf("Number")>-1&&a%1===0},ariaAttr:g},b.extend=function(c,d){a.fn[c]=function(e,f){var g=this.data(c);return"picker"==e?g:g&&"string"==typeof e?b._.trigger(g[e],g,[f]):this.each(function(){var f=a(this);f.data(c)||new b(this,c,d,e)})},a.fn[c].defaults=d.defaults},b}),function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):"object"==typeof exports?module.exports=a(require("./picker.js"),require("jquery")):a(Picker,jQuery)}(function(a,b){function c(a,b){var c=this,d=a.$node[0],e=d.value,f=a.$node.data("value"),g=f||e,h=f?b.formatSubmit:b.format,i=function(){return d.currentStyle?"rtl"==d.currentStyle.direction:"rtl"==getComputedStyle(a.$root[0]).direction};c.settings=b,c.$node=a.$node,c.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate",view:"parse create validate viewset",disable:"deactivate",enable:"activate"},c.item={},c.item.clear=null,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now"),g?c.set("select",g,{format:h}):c.set("select",null).set("highlight",c.item.now),c.key={40:7,38:-7,39:function(){return i()?-1:1},37:function(){return i()?1:-1},go:function(a){var b=c.item.highlight,d=new Date(b.year,b.month,b.date+a);c.set("highlight",d,{interval:a}),this.render()}},a.on("render",function(){a.$root.find("."+b.klass.selectMonth).on("change",function(){var c=this.value;c&&(a.set("highlight",[a.get("view").year,c,a.get("highlight").date]),a.$root.find("."+b.klass.selectMonth).trigger("focus"))}),a.$root.find("."+b.klass.selectYear).on("change",function(){var c=this.value;c&&(a.set("highlight",[c,a.get("view").month,a.get("highlight").date]),a.$root.find("."+b.klass.selectYear).trigger("focus"))})},1).on("open",function(){var d="";c.disabled(c.get("now"))&&(d=":not(."+b.klass.buttonToday+")"),a.$root.find("button"+d+", select").attr("disabled",!1)},1).on("close",function(){a.$root.find("button, select").attr("disabled",!0)},1)}var d=7,e=6,f=a._;c.prototype.set=function(a,b,c){var d=this,e=d.item;return null===b?("clear"==a&&(a="select"),e[a]=b,d):(e["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",e.select,c):"highlight"==a?d.set("view",e.highlight,c):a.match(/^(flip|min|max|disable|enable)$/)&&(e.select&&d.disabled(e.select)&&d.set("select",e.select,c),e.highlight&&d.disabled(e.highlight)&&d.set("highlight",e.highlight,c)),d)},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(a,c,d){var e,g=this;return c=void 0===c?a:c,c==-(1/0)||c==1/0?e=c:b.isPlainObject(c)&&f.isInteger(c.pick)?c=c.obj:b.isArray(c)?(c=new Date(c[0],c[1],c[2]),c=f.isDate(c)?c:g.create().obj):c=f.isInteger(c)||f.isDate(c)?g.normalize(new Date(c),d):g.now(a,c,d),{year:e||c.getFullYear(),month:e||c.getMonth(),date:e||c.getDate(),day:e||c.getDay(),obj:e||c,pick:e||c.getTime()}},c.prototype.createRange=function(a,c){var d=this,e=function(a){return a===!0||b.isArray(a)||f.isDate(a)?d.create(a):a};return f.isInteger(a)||(a=e(a)),f.isInteger(c)||(c=e(c)),f.isInteger(a)&&b.isPlainObject(c)?a=[c.year,c.month,c.date+a]:f.isInteger(c)&&b.isPlainObject(a)&&(c=[a.year,a.month,a.date+c]),{from:e(a),to:e(c)}},c.prototype.withinRange=function(a,b){return a=this.createRange(a.from,a.to),b.pick>=a.from.pick&&b.pick<=a.to.pick},c.prototype.overlapRanges=function(a,b){var c=this;return a=c.createRange(a.from,a.to),b=c.createRange(b.from,b.to),c.withinRange(a,b.from)||c.withinRange(a,b.to)||c.withinRange(b,a.from)||c.withinRange(b,a.to)},c.prototype.now=function(a,b,c){return b=new Date,c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c)},c.prototype.navigate=function(a,c,d){var e,f,g,h,i=b.isArray(c),j=b.isPlainObject(c),k=this.item.view;if(i||j){for(j?(f=c.year,g=c.month,h=c.date):(f=+c[0],g=+c[1],h=+c[2]),d&&d.nav&&k&&k.month!==g&&(f=k.year,g=k.month),e=new Date(f,g+(d&&d.nav?d.nav:0),1),f=e.getFullYear(),g=e.getMonth();new Date(f,g,h).getMonth()!==g;)h-=1;c=[f,g,h]}return c},c.prototype.normalize=function(a){return a.setHours(0,0,0,0),a},c.prototype.measure=function(a,b){var c=this;return b?"string"==typeof b?b=c.parse(a,b):f.isInteger(b)&&(b=c.now(a,b,{rel:b})):b="min"==a?-(1/0):1/0,b},c.prototype.viewset=function(a,b){return this.create([b.year,b.month,1])},c.prototype.validate=function(a,c,d){var e,g,h,i,j=this,k=c,l=d&&d.interval?d.interval:1,m=-1===j.item.enable,n=j.item.min,o=j.item.max,p=m&&j.item.disable.filter(function(a){if(b.isArray(a)){var d=j.create(a).pick;d<c.pick?e=!0:d>c.pick&&(g=!0)}return f.isInteger(a)}).length;if((!d||!d.nav)&&(!m&&j.disabled(c)||m&&j.disabled(c)&&(p||e||g)||!m&&(c.pick<=n.pick||c.pick>=o.pick)))for(m&&!p&&(!g&&l>0||!e&&0>l)&&(l*=-1);j.disabled(c)&&(Math.abs(l)>1&&(c.month<k.month||c.month>k.month)&&(c=k,l=l>0?1:-1),c.pick<=n.pick?(h=!0,l=1,c=j.create([n.year,n.month,n.date+(c.pick===n.pick?0:-1)])):c.pick>=o.pick&&(i=!0,l=-1,c=j.create([o.year,o.month,o.date+(c.pick===o.pick?0:1)])),!h||!i);)c=j.create([c.year,c.month,c.date+l]);return c},c.prototype.disabled=function(a){var c=this,d=c.item.disable.filter(function(d){return f.isInteger(d)?a.day===(c.settings.firstDay?d:d-1)%7:b.isArray(d)||f.isDate(d)?a.pick===c.create(d).pick:b.isPlainObject(d)?c.withinRange(d,a):void 0});return d=d.length&&!d.filter(function(a){return b.isArray(a)&&"inverted"==a[3]||b.isPlainObject(a)&&a.inverted}).length,-1===c.item.enable?!d:d||a.pick<c.item.min.pick||a.pick>c.item.max.pick},c.prototype.parse=function(a,b,c){var d=this,e={};return b&&"string"==typeof b?(c&&c.format||(c=c||{},c.format=d.settings.format),d.formats.toArray(c.format).map(function(a){var c=d.formats[a],g=c?f.trigger(c,d,[b,e]):a.replace(/^!/,"").length;c&&(e[a]=b.substr(0,g)),b=b.substr(g)}),[e.yyyy||e.yy,+(e.mm||e.m)-1,e.dd||e.d]):b},c.prototype.formats=function(){function a(a,b,c){var d=a.match(/\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)+1),d.length}function b(a){return a.match(/\w+/)[0].length}return{d:function(a,b){return a?f.digits(a):b.date},dd:function(a,b){return a?2:f.lead(b.date)},ddd:function(a,c){return a?b(a):this.settings.weekdaysShort[c.day]},dddd:function(a,c){return a?b(a):this.settings.weekdaysFull[c.day]},m:function(a,b){return a?f.digits(a):b.month+1},mm:function(a,b){return a?2:f.lead(b.month+1)},mmm:function(b,c){var d=this.settings.monthsShort;return b?a(b,d,c):d[c.month]},mmmm:function(b,c){var d=this.settings.monthsFull;return b?a(b,d,c):d[c.month]},yy:function(a,b){return a?2:(""+b.year).slice(2)},yyyy:function(a,b){return a?4:b.year},toArray:function(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(a,b){var c=this;return c.formats.toArray(a).map(function(a){return f.trigger(c.formats[a],c,[0,b])||a.replace(/^!/,"")}).join("")}}}(),c.prototype.isDateExact=function(a,c){var d=this;return f.isInteger(a)&&f.isInteger(c)||"boolean"==typeof a&&"boolean"==typeof c?a===c:(f.isDate(a)||b.isArray(a))&&(f.isDate(c)||b.isArray(c))?d.create(a).pick===d.create(c).pick:b.isPlainObject(a)&&b.isPlainObject(c)?d.isDateExact(a.from,c.from)&&d.isDateExact(a.to,c.to):!1},c.prototype.isDateOverlap=function(a,c){var d=this,e=d.settings.firstDay?1:0;return f.isInteger(a)&&(f.isDate(c)||b.isArray(c))?(a=a%7+e,a===d.create(c).day+1):f.isInteger(c)&&(f.isDate(a)||b.isArray(a))?(c=c%7+e,c===d.create(a).day+1):b.isPlainObject(a)&&b.isPlainObject(c)?d.overlapRanges(a,c):!1},c.prototype.flipEnable=function(a){var b=this.item;b.enable=a||(-1==b.enable?1:-1)},c.prototype.deactivate=function(a,c){var d=this,e=d.item.disable.slice(0);return"flip"==c?d.flipEnable():c===!1?(d.flipEnable(1),e=[]):c===!0?(d.flipEnable(-1),e=[]):c.map(function(a){for(var c,g=0;g<e.length;g+=1)if(d.isDateExact(a,e[g])){c=!0;break}c||(f.isInteger(a)||f.isDate(a)||b.isArray(a)||b.isPlainObject(a)&&a.from&&a.to)&&e.push(a)}),e},c.prototype.activate=function(a,c){var d=this,e=d.item.disable,g=e.length;return"flip"==c?d.flipEnable():c===!0?(d.flipEnable(1),e=[]):c===!1?(d.flipEnable(-1),e=[]):c.map(function(a){var c,h,i,j;for(i=0;g>i;i+=1){if(h=e[i],d.isDateExact(h,a)){c=e[i]=null,j=!0;break}if(d.isDateOverlap(h,a)){b.isPlainObject(a)?(a.inverted=!0,c=a):b.isArray(a)?(c=a,c[3]||c.push("inverted")):f.isDate(a)&&(c=[a.getFullYear(),a.getMonth(),a.getDate(),"inverted"]);break}}if(c)for(i=0;g>i;i+=1)if(d.isDateExact(e[i],a)){e[i]=null;break}if(j)for(i=0;g>i;i+=1)if(d.isDateOverlap(e[i],a)){e[i]=null;break}c&&e.push(c)}),e.filter(function(a){return null!=a})},c.prototype.nodes=function(a){var b=this,c=b.settings,g=b.item,h=g.now,i=g.select,j=g.highlight,k=g.view,l=g.disable,m=g.min,n=g.max,o=function(a,b){return c.firstDay&&(a.push(a.shift()),b.push(b.shift())),f.node("thead",f.node("tr",f.group({min:0,max:d-1,i:1,node:"th",item:function(d){return[a[d],c.klass.weekdays,'scope=col title="'+b[d]+'"']}})))}((c.showWeekdaysFull?c.weekdaysFull:c.weekdaysLetter).slice(0),c.weekdaysFull.slice(0)),p=function(a){return f.node("div"," ",c.klass["nav"+(a?"Next":"Prev")]+(a&&k.year>=n.year&&k.month>=n.month||!a&&k.year<=m.year&&k.month<=m.month?" "+c.klass.navDisabled:""),"data-nav="+(a||-1)+" "+f.ariaAttr({role:"button",controls:b.$node[0].id+"_table"})+' title="'+(a?c.labelMonthNext:c.labelMonthPrev)+'"')},q=function(d){var e=c.showMonthsShort?c.monthsShort:c.monthsFull;return"short_months"==d&&(e=c.monthsShort),c.selectMonths&&void 0==d?f.node("select",f.group({min:0,max:11,i:1,node:"option",item:function(a){return[e[a],0,"value="+a+(k.month==a?" selected":"")+(k.year==m.year&&a<m.month||k.year==n.year&&a>n.month?" disabled":"")]}}),c.klass.selectMonth+" browser-default",(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"})+' title="'+c.labelMonthSelect+'"'):"short_months"==d?null!=i?f.node("div",e[i.month]):f.node("div",e[k.month]):f.node("div",e[k.month],c.klass.month)},r=function(d){var e=k.year,g=c.selectYears===!0?5:~~(c.selectYears/2);if(g){var h=m.year,i=n.year,j=e-g,l=e+g;if(h>j&&(l+=h-j,j=h),l>i){var o=j-h,p=l-i;j-=o>p?p:o,l=i}if(c.selectYears&&void 0==d)return f.node("select",f.group({min:j,max:l,i:1,node:"option",item:function(a){return[a,0,"value="+a+(e==a?" selected":"")]}}),c.klass.selectYear+" browser-default",(a?"":"disabled")+" "+f.ariaAttr({controls:b.$node[0].id+"_table"})+' title="'+c.labelYearSelect+'"')}return"raw"==d?f.node("div",e):f.node("div",e,c.klass.year)};return createDayLabel=function(){return null!=i?f.node("div",i.date):f.node("div",h.date)},createWeekdayLabel=function(){var a;a=null!=i?i.day:h.day;var b=c.weekdaysFull[a];return b},f.node("div",f.node("div",createWeekdayLabel(),"picker__weekday-display")+f.node("div",q("short_months"),c.klass.month_display)+f.node("div",createDayLabel(),c.klass.day_display)+f.node("div",r("raw"),c.klass.year_display),c.klass.date_display)+f.node("div",f.node("div",(c.selectYears?q()+r():q()+r())+p()+p(1),c.klass.header)+f.node("table",o+f.node("tbody",f.group({min:0,max:e-1,i:1,node:"tr",item:function(a){var e=c.firstDay&&0===b.create([k.year,k.month,1]).day?-7:0;return[f.group({min:d*a-k.day+e+1,max:function(){return this.min+d-1},i:1,node:"td",item:function(a){a=b.create([k.year,k.month,a+(c.firstDay?1:0)]);var d=i&&i.pick==a.pick,e=j&&j.pick==a.pick,g=l&&b.disabled(a)||a.pick<m.pick||a.pick>n.pick,o=f.trigger(b.formats.toString,b,[c.format,a]);return[f.node("div",a.date,function(b){return b.push(k.month==a.month?c.klass.infocus:c.klass.outfocus),h.pick==a.pick&&b.push(c.klass.now),d&&b.push(c.klass.selected),e&&b.push(c.klass.highlighted),g&&b.push(c.klass.disabled),b.join(" ")}([c.klass.day]),"data-pick="+a.pick+" "+f.ariaAttr({role:"gridcell",label:o,selected:d&&b.$node.val()===o?!0:null,activedescendant:e?!0:null,disabled:g?!0:null})),"",f.ariaAttr({role:"presentation"})]}})]}})),c.klass.table,'id="'+b.$node[0].id+'_table" '+f.ariaAttr({role:"grid",controls:b.$node[0].id,readonly:!0})),c.klass.calendar_container)+f.node("div",f.node("button",c.today,"btn-flat picker__today","type=button data-pick="+h.pick+(a&&!b.disabled(h)?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.clear,"btn-flat picker__clear","type=button data-clear=1"+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id}))+f.node("button",c.close,"btn-flat picker__close","type=button data-close=true "+(a?"":" disabled")+" "+f.ariaAttr({controls:b.$node[0].id})),c.klass.footer)},c.defaults=function(a){return{labelMonthNext:"Next month",labelMonthPrev:"Previous month",labelMonthSelect:"Select a month",labelYearSelect:"Select a year",monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],weekdaysLetter:["S","M","T","W","T","F","S"],today:"Today",clear:"Clear",close:"Close",format:"d mmmm, yyyy",klass:{table:a+"table",header:a+"header",date_display:a+"date-display",day_display:a+"day-display",month_display:a+"month-display",year_display:a+"year-display",calendar_container:a+"calendar-container",navPrev:a+"nav--prev",navNext:a+"nav--next",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear",buttonToday:a+"button--today",buttonClose:a+"button--close"}}}(a.klasses().picker+"__"),a.extend("pickadate",c)}),function(a){function b(){var b=+a(this).attr("length"),c=+a(this).val().length,d=b>=c;a(this).parent().find('span[class="character-counter"]').html(c+"/"+b),e(d,a(this))}function c(b){$counterElement=a("<span/>").addClass("character-counter").css("float","right").css("font-size","12px").css("height",1),b.parent().append($counterElement)}function d(){a(this).parent().find('span[class="character-counter"]').html("")}function e(a,b){inputHasInvalidClass=b.hasClass("invalid"),a&&inputHasInvalidClass?b.removeClass("invalid"):a||inputHasInvalidClass||(b.removeClass("valid"),b.addClass("invalid"))}a.fn.characterCounter=function(){return this.each(function(){itHasLengthAttribute=void 0!=a(this).attr("length"),itHasLengthAttribute&&(a(this).on("input",b),a(this).on("focus",b),a(this).on("blur",d),c(a(this)))})},a(document).ready(function(){a("input, textarea").characterCounter()})}(jQuery);

/* FIM JS DO MATERIALIZE CSS materialize.min.js */

/* INICIO JS DO MATERIALIZE CSS init.js */

(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space
/* INICIO JS DO MATERIALIZE CSS init.js */