# OEM

[&larr; README](../README.md)

## Client-side Api
The Oem Client-side Api is component library you're creating. All components utilizing the lifecycle methods made available by the api in order to facilitate component to component communcation and composition. The entire api is defined in the `./development/core/module.js` module.

<br/>

#### oem.list.all()
List's all component instances.

<br/>

#### oem.list.byType(componentType)
List's all component instances by type. Only the component name need be passed. For example, if you had a Field component, you'd pass 'Field'.

<br/>

### oem.create(component, options)
Create a new component.

1. component - this is the path to a components namespace. ie: `oem.Core.Component`
1. options - this is an object literal for settings to overwrite. ie: `{ id: 'diff-id' }`

All components must have a unique id. If no `oem-id` attribute exists on the components DOM element, a guid is automatically assigned. 

<br/>

### oem.read(componentId)
Returns the instance of a component by it's unique id.

<br/>

### oem.destroy(componentId)
The component instance is remove and it's DOM element removed from DOM.

<br/>

### oem.init(components)
Auto initializes all components. This is useful if you are dynamically creating your DOM elements and would like to bulk initialize them.

<br/>

### oem.events
Proxy to internal event bus

<br/>

### oem.EVENTS
Reference to internal core event list