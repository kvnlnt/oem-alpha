# OEM

## Justification

### We need the features and functionality that frameworks provide in order to efficiently produce a modern web application.
Modern adaptive and responsive design UI/UX, device fragmentation, legacy browser support, opinionated frameworks combined with the heavy churn of frontend toolchains have turned modern frontend development into a gauntlet of gotchas. Unfortunately, we need the features and functionality that frameworks provide in order to efficiently produce a modern web application. 

Today's applications often contain more clientside than serverside code. Some applications are 100% "clientside" and connect to a variety of backend services. This clientside code is often untested or even worse, untestable (without some refactoring). Frameworks help us because they can abstract away core functionality and offer us the reliability of having been tested. 


### This creates core dependencies on frameworks that can and will evolve away from your implementation(s) which means that future upgrades, etc will become painful.
Application logic is at the mercy of your chosen framework but if "done right" can be largely isolated from the features you used in the framework to construct your app. However, this isn't the same for component libraries. All the work that goes into interface flow, selecting dom elements, maintaining state, etc quickly become hotspots for monkeypatching, rerendering, etc...as their intergrations become tightly wound to the component library itself. Additionally their implementation details become integrated into the application logic layer (rendering, events, etc). This creates core dependencies on frameworks that can and will evolve away from your implementation(s) which means that future upgrades, etc will become painful.

### You are already maintaining your own library:
Because of these tight integration interdependencies you are married to the library AND your implementation. If you've done it "the library's way" you did a good job of working with the marketing dept. However, if you've been forced to compromise the power of the library with every customization imaginable (like the rest of us) then chances are you are already maintaining your own library. A library that wasn't built for your implementation.

### OEM *is* a framework but it's a framework that provides you with the tools to build your own component library.
Your ability to create your own testable, highly customizable components allows you to take control of the quality, efficiency and evolution of your own applications and their workflow. Want two different types of modals? No problem. How about inventing something brand new or finding something in another component library you like, no problem, just create it or port it over!

By building your own component library, you can tightly control:

1. UI/UX
1. Device support
1. Dependency chains
1. Evolutionary pace
1. Build processes

This control will allow you to:

1. Speed up prototyping
1. Introduce interactive prototypes
1. Enable better estimates
1. Speed up design time
1. Speed up development time
1. Solve problems better and faster