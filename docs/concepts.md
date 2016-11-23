# OEM

[&larr; Guide](./guide.md)

## Concepts
The following concepts are helpful to keep in mind when building components with Oem. 

<br/>

## Table of contents
1. [Prototyping](#prototyping)
1. [Modules and Namespacing](#modules-and-namespacing)
1. [Instantiation](#instantiation)
1. [The Core Component](#the-core-component)
1. [Inheritence](#inheritence)
1. [Aggregation and Mixin Pattern](#aggregation-and-mixin-pattern)
1. [Events](#events)

<br/>

### Prototyping
The `./development/core/Prototype.js` module is a small helper class that provides a simple way to prototype out new components. Only two parameters are needed:

1. proto - this is the path to a components namespace. ie: `oem.Core.Component`
1. settings - this is an object literal for settings to overwrite. ie: `{ id: 'diff-id' }`

Prototyping is at the heart of the oem approach to everthing. Each "instance" of a component on a page is a distinct object that has been prototyped off of another. The prototypes that you create in your component library are kept separate from "instances" you use on the page through simple namespacing.

<br/>

### Modules and Namespacing
The core component has it's own namespace `oem.Core` which exposes all the core functionalty of oem. All other components are namespaced off of `oem.Components` with a name such as `oem.Components.Accordion`. This namespacing is handled by the components `module.js` file by convention. All other files and scripts in the component should be namespaced off the component's namespace. For example the default `prototype.js` file is automatically namespaced for you when you create a new component to something like this `oem.Components.Accordion.Prototype`.

<br/>

### Instantiation
All instances of a component on a page are prototypes from one of your components. These instances are kept separate from those component definitions through the Oem Clientside Api "lifecycle" methods. These include: list, create, read, destroy, etc. On page load, all components detected in the `oem.Components` namespace are automatically initialized if found on the page. Using `oem.list.all` is an easy way to inspect every instance of a component on your page. [See the client side api for more](./client-side-api.md)

<br/>

### The Core Component
All components are prototyped from the `./development/core/Component.js` module by default. The core component defines the basic set of properties and methods needed by the oem client side api.

<br/>

### Inheritence
Utilizing the `Prototype` module from above it's easy to implement a base component that other components can inherit from. One use case example would be a "field" component. Once created, you may create another component such as a "text-input". Once scaffoled out, you can swap out the the *text-input* components prototype from the default `oem.Core.Component` to `oem.Components.Field.Prototype`. Now anything added to the base component will automatically be inherited by the text-input component.

<br/>

### Aggregation and Mixin Pattern
With the Oem Client-side api, it's easy to components to talk to each other and therefore it's easy to implement mixin and aggregation patterns. One such use case for this is a "responsive" component. With it's own properties and methods it can watch another component (with `oem.read`) and react by adding and removing classes. 

<br/>

### Events
All components are responsible for defining their own events. One implementation pattern would be the following:

*./your-component/prototype.js*

    // inside the init function
    this.setEvents({
        submitted: this.getId() + ":submitted"
    });

    // somewhere else down the page
    oem.events.dispatch(this.getEvents().submitted, this, {...data...});

*./somewhere-over-the-rainbow/prototype.js*

    // inside some function
    var componentImListeningTo = oem.read('my-components-unique-id');
    var eventImListeningFor = componentImListeningTo.getEvents().submitted;
    oem.events.addEventListener(eventImListeningFor, handler);

    // the handler function
    handle: function(data){
        ...handle data here...
    }

FYI: one thing to consider here – there's no magic going on. If you register a listener to an event that doesn't exist yet because the component hasn't yet loaded - it won't work, that's all on you - and that's good thing. 