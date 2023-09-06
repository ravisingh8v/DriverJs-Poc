import store from "@/store";
import { Driver, driver } from "driver.js";

// initial config for the tour
const configuration = {
    overlayColor: 'rgb(0, 0, 0)',
    allowClose: true,
    animate: false,
    showProgress: false,
    disableActiveInteraction: false
}

// this function call when we change the configuration 
export const useChangeConfiguration = (config?: any): void => {
    configuration.overlayColor = config.overlayColor
    configuration.allowClose = config.allowClose
    configuration.animate = config.animate
    configuration.showProgress = config.showProgress
    configuration.disableActiveInteraction = !config.interaction
}


// let activeTour = '';

/**
 * Used to just highlight the targeted element
 * @param element 
 * @param title 
 * @param description 
 */
export const useHighlightElement = (element?: string, title?: string, description?: string): void => {
    // initializing driver 
    const highlightGuide = driver()
    // setting config 
    highlightGuide.setConfig({ ...configuration, stagePadding: 5 })
    // highlight 
    highlightGuide.highlight({
        element: '#' + element,
        popover: {
            title: title,
            description: description,
            align: 'center',
            side: 'top'

        },
    })
}

/**
 * @param element 
 * @param title 
 * @param description 
 */
// export const useAsyncTour = (element?: string, title?: string, description?: string): void => {
//     // initializing driver 
//     const asyncTour = driver()
//     // setting config 
//     asyncTour.setConfig({
//         ...configuration, stagePadding: 5,
//         onPopoverRender: () => {
//             const elem = document.createElement('div')
//             elem.innerHTML = '<p>hello</p>'
//             elem.classList.add('asyncComponent')
//             elem.setAttribute("id", "async")
//             const body = document.querySelector('body')
//             body?.appendChild(elem)
//         }
//     })
//     // highlight 
//     asyncTour.highlight({

//         element: '#async',
//         popover: {
//             title: title,
//             description: description,
//         },
//     })
// }

/**
 * 
 * @param element 
 * @param title 
 * @param description 
 */
export const useConfigurationTour = (status?: boolean, element?: string, title?: string, description?: string,): any => {
    driver().destroy()

    // initializing driver 
    const configurationTour = driver()
    // setting config 
    configurationTour.setConfig({
        ...configuration, stagePadding: 1
    })
    // helping function 
    function onNextClick(activeIndex: any) {
        configurationTour.drive(activeIndex + 1);
        document.cookie = `configurationActiveStep=${activeIndex + 1}`
    }
    // highlight 
    configurationTour.setSteps([
        {
            element: '#background-config',
            popover: {
                title: 'Overlay Color',
                description: 'Here you can change the background color of overlay',
                onNextClick: (element, step, opts) => {
                    onNextClick(opts.state.activeIndex)
                }
            },

        },
        {
            element: '#exit-config',
            popover: {
                title: 'Exit Prevention',
                description: 'By Selecting this you are allowed to exit from the tour',
                onNextClick: (element, step, opts) => {
                    onNextClick(opts.state.activeIndex)
                }
            },
        },
        {
            element: '#interaction-config',
            popover: {
                title: 'Interaction',
                description: 'By Selecting this you can interact with the highlighted element',
                onNextClick: (element, step, opts) => {
                    onNextClick(opts.state.activeIndex)
                }
            },
        },
        {
            element: '#animation-config',
            popover: {
                title: 'Animation',
                description: 'By Checking this you can animate the tour on each step.',
                onNextClick: (element, step, opts) => {
                    onNextClick(opts.state.activeIndex)
                }
            },
        },
        {
            element: '#progress-config',
            popover: {
                title: 'Step Progress',
                description: 'By checking this you can see the progress steps in the popover.',
                onNextClick: (element, step, opts) => {
                    onNextClick(opts.state.activeIndex)
                    localStorage.setItem('configuration', 'true')
                }
            },
        },
    ])

    // getting cookie 
    const getCookie = +(document.cookie.split('=').pop() || '0')
    console.log(getCookie)
    const isTourCompleted = localStorage.getItem('configuration')

    // if (activeTour == "configurationTour") {
    setTimeout(() => {
        if (status) {
            console.log(isTourCompleted)
            !isTourCompleted && configurationTour.drive(getCookie)
        } else {
            configurationTour.destroy()
        }
    }, 500)
    // }
}



// Single focus element 
export const useFocusHighlight = () => {
    const focusHighlight = driver();
    focusHighlight.setConfig({
        ...configuration, disableActiveInteraction: false,

        onDeselected(element, step, opts) {
            const elem = document.getElementById('email')
            elem?.blur()
        }
    });
    focusHighlight.highlight({
        element: '#email',
        popover: {
            description: 'Write your email, we will get back to you.'
        }
    })
}

// const isElementVisible = (elem: any) => {
//     const rect = elem.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
//     );
// };
// // Scroll the page to bring the element into view
// const scrollIfNeeded = (elem: any) => {
//     if (!isElementVisible(elem)) {
//         console.log(elem.scrollIntoView())
//         const rect = elem.getBoundingClientRect()
//         window.scrollX = rect.top
//         elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
//     }
// };


/**
 * 
 */
export const useTour = () => {
    // first destroying the instance 
    driver().destroy()
    console.log(configuration)
    // Initializing driver 
    const tourGuide = driver();

    // setting config 
    tourGuide.setConfig({
        ...configuration, disableActiveInteraction: true
    })
    tourGuide.setSteps([

        {
            element: '#home-link',
            popover: {
                title: 'Home',
                description: 'This will navigate you to the home page',
            },
        },
        {
            element: '#tour-link',
            popover: {
                title: 'Tours',
                description: 'Here you can see different types of tour.'
            }
        },
        {
            element: '#dropdown-toggle',
            popover: {
                title: 'Tour Configuration',
                description: 'You can customize the tour by configuring here'
            }
        },
        {
            element: '#socials-wrapper',
            popover: {
                title: 'Social Handles',
                description: 'Here you can find us on social media.'
            }
        },
        {
            element: '#tours-container',
            popover: {
                title: 'Tours',
                description: 'Here you can try multiple tour/guide options.',
                align: "center",
                side: "top"
            }
        },

    ])
    tourGuide.drive()
}

/**
 * 
 */
export const useMobileTour = () => {
    // first destroying the instance 
    driver().destroy()
    console.log(configuration)
    // Initializing driver 
    const tourGuide = driver();

    // setting config 
    tourGuide.setConfig({
        ...configuration, disableActiveInteraction: true, stagePadding: 2
    })
    tourGuide.setSteps([
        {
            element: '#sidebar-hamburger',
            popover: {
                title: 'Sidebar',
                description: 'This icon open the sidebar',
                onNextClick(elem, step, opts) {
                    tourGuide.refresh()
                    store.dispatch('setIsSidebarOpen', true);
                    setTimeout(() => {
                        tourGuide.moveNext()
                    }, 500)
                }
            },
        },

        {
            element: '#sidebar-home',
            popover: {
                title: 'Home',
                description: 'This will navigate you to the home page',
            },
        },
        {
            element: '#sidebar-tour',
            popover: {
                title: 'Tours',
                description: 'Here you can see different types of tour.'
            }
        },
        {
            element: '#sidebar-dropdown',
            popover: {
                title: 'Tour Configuration',
                description: 'You can customize the tour by configuring here'
            }
        },
        {
            element: '#tours-container',
            popover: {
                title: 'Tours',
                description: 'Here you can try multiple tour/guide options.',
                align: "center",
                side: "top"
            }
        },

    ])
    tourGuide.drive()
}



export const useNoElementHighlight = () => {
    driver().destroy();

    const noElementHighlight = driver()
    noElementHighlight.highlight({
        popover: {
            title: "No Element",
            description: 'This is the example of no element highlight we can use it as a pop-up'
        }
    })
}
export const usePreventExitHighlight = (elem: string) => {
    driver().destroy();

    const preventExitHighlight = driver()
    preventExitHighlight.setConfig({ ...configuration, allowClose: false })
    preventExitHighlight.setSteps([{
        element: '#' + elem,
        popover: {
            title: "Prevent Exit",
            description: 'Here you cant exit without completing all the steps or if one steps is only there then exit by only with done button'
        }
    }])
    preventExitHighlight.drive()
}


// onPopoverRender(popover) {
//     document.createElement("div").id = 'async-tour'
//     const container = document.getElementById('async-tour')
//     const body = document.querySelector('body')
//     if (container) {
//         body?.appendChild(container)
//         console.log(container)
//     }
// },
// onHighlightStarted(a) {
//     console.log(a)
// },



 // {
        //     element: '#' + element,
        //     popover: {
        //         title: title,
        //         description: description
        //     }
        // },
        // {
        //     element: '#' + element,
        //     popover: {
        //         title: title,
        //         description: description
        //     }
        // },
        // {
        //     element: '#' + element,
        //     popover: {
        //         title: title,
        //         description: description
        //     }
        // }


 // onNextClick(element, step, opts) {
                //     if (opts.state?.activeIndex == 0) {
                //         if (opts.config.steps) {
                //             const elementId = opts.config.steps[opts.state.activeIndex + 1].element?.toString().split('#')
                //             if (elementId) {
                //                 const element = document.getElementById(elementId[1])
                //                 // scrollIfNeeded(element)
                //                 tourGuide.moveTo(opts.state.activeIndex + 1)
                //             }
                //         }
                //     }
                // }