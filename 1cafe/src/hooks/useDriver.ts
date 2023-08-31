// Driver Hook
import { driver } from "driver.js";
import router from "@/router";

const isGuideActive = {
    navigation: false,
    feature: false,
    contextual: false
}

/**
 * Contextual Highlight
 * @param id getting element id to set the value for element in driver object
 * @param title same for the title
 * @param description same for the description
 */
export function useContextualHighlight(
    id?: string,
    title?: string,
    description?: string
) {
    function setHighlightToLocalstorage() {
        localStorage.setItem("contextualHighlight", "true")
    }
    if (!localStorage.getItem("contextualHighlight")) {
        localStorage.setItem("contextualHighlight", "false");
    }
    // const getContextualGuide = localStorage.getItem("contextualHighlight");

    const contextualHighlight = driver();
    contextualHighlight.setConfig({
        stagePadding: 4,
        showButtons: ['close']
    })
    contextualHighlight.setSteps([
        {
            onDeselected() {
                isGuideActive.contextual = false
                setHighlightToLocalstorage()
            },

            element: '#' + id,
            popover: {
                title: title,
                description: description,
                align: 'start',
                onCloseClick() {
                    isGuideActive.contextual = false
                    contextualHighlight.destroy()
                    setHighlightToLocalstorage()
                }
            }
        }
    ])

    // contextualHighligh.highlight({
    //         element: "#" + id,
    //         popover: {
    //             title: title,
    //             description: description,
    //         },
    //     });
    // if (!localStorage.getItem("contextualHighlight")) {
    //     contextualHighlight.drive()
    // }
    // if (getContextualGuide == "false") {
    if (!isGuideActive.feature && !isGuideActive.feature) {
        isGuideActive.contextual = true
        contextualHighlight.drive()
    }
    // }
    return contextualHighlight

}

/**
 * Feature Guide for Order page
 */
export function useOrderPageFeatureTour() {

    if (!isGuideActive.navigation && !isGuideActive.contextual) {

        setTimeout(() => {
            // to check orderTour not already present in localstorage
            if (!localStorage.getItem("orderTour")) {
                localStorage.setItem("orderTour", "false");
            }
            // to get navigationTour
            const getOrderTour = localStorage.getItem("orderTour");

            //navigationTour not found then only tour
            if (getOrderTour == "false") {
                const driverObj = driver({
                    showButtons: ["close", "next"],
                    doneBtnText: "Okay",
                    prevBtnText: "",


                    // popoverClass: 'simple-highlight',
                    // onHighlightStarted(a, b, c) {
                    //     console.log(c.state.activeIndex);
                    //     driverObj.moveTo(c.state.activeIndex || 0)

                    // },
                    onDeselected() {
                        isGuideActive.feature = false
                    },
                    steps: [
                        {
                            element: "#breadcrumb-tab",
                            popover: {
                                title: "New",
                                description:
                                    "Explore 'Breakfast' and 'Bakery' Products in Separate Tabs. Enjoy Effortless Browsing!",
                                side: "bottom",
                                align: "start",
                                popoverClass: 'popover-feature',
                                onPopoverRender(popover, opts) {

                                    // element.style.pointerEvents = 'none';
                                    localStorage.setItem("orderTour", "true");
                                },
                                onCloseClick() {
                                    isGuideActive.feature = false
                                },

                            },
                        },
                    ],
                });


                isGuideActive.feature = true
                const route = router.currentRoute.value.path

                if (route == "/order") {
                    driverObj.drive();
                }

                // mediaWidth.value < 768 ? driverObj.destroy() : ''
                // console.log(mediaWidth.value);

                return driverObj;
            }
        }, 2000);
    }
}
// element?: any, title?: any, description?: any, mediaWidth?: any
// let windowWidth;
// let desktopMode;
// windowWidth = window.innerWidth;
// console.log("initial", windowWidth);

// window.addEventListener("resize", () => {
//     windowWidth = window.innerWidth;
//     if (windowWidth < 768) {
//         desktopMode = false
//     }
//     if (windowWidth >= 768) {
//         desktopMode = true
//     }

// });



/**
 * Navigation Tour
 * @param isMobile 
 * @param openMenu 
 */
export function useNavTour(isMobile?: any, openMenu?: any): any {
    const timeout = isMobile.isMobile ? !openMenu ? 100 : 500 : 1000;

    setTimeout(() => {
        const webTour = driver();

        // to check navigationTour not already present in localstorage
        if (!localStorage.getItem("navigationTour")) {
            localStorage.setItem("navigationTour", "false");
        }
        // to get navigationTour
        const getNavTour = localStorage.getItem("navigationTour");

        // get active step  from cookie storage 
        const getCookie = document.cookie.split('=').pop()?.toString();
        const getLastStep = +(getCookie || '0')
        // to get active step of the tour 
        function getActiveIndex(opts: any, num?: number) {
            return opts.state?.activeIndex || getLastStep
        }
        //navigationTour not found then only tour
        if (
            getNavTour == "false" &&
            ((openMenu && isMobile.isMobile) || !isMobile.isMobile)
        ) {
            // configuration for step 
            webTour.setConfig({
                allowClose: false,
                smoothScroll: true,
                showProgress: true,
                nextBtnText: "Next",
                prevBtnText: "Previous",
            });
            // const isAuthenticated = localStorage.getItem('userId') ? true : false;

            // setting steps for the tour 
            webTour.setSteps([
                {
                    element: "#home-tab",
                    popover: {
                        title: "Home Page",
                        description:
                            "This is the home page of the website. You can find all of the featured products here.",
                        // side: "bottom",
                        // align: "center",
                        // alt: 'Image of a home page'

                    },

                    onDeselected(element, step, opts) {
                        document.cookie = `navActiveStep=${getActiveIndex(opts)}`
                    }
                },
                {
                    element: "#order-tab",
                    popover: {
                        title: "Order Page",
                        description:
                            "This is the order page. You can order food from here.",
                        // side: "bottom",
                        // align: "center",
                        // alt: 'Image of an order page'
                    },
                    onDeselected(element, step, opts) {
                        document.cookie = `navActiveStep=${getActiveIndex(opts)}`
                    }
                },
                {
                    element: "#contact-tab",
                    popover: {
                        title: "Contact Us",
                        description: "This is the contact page. You can contact us here.",
                        // side: "bottom",
                        // align: "center",
                        // alt: 'Image of a contact page'
                    },
                    onDeselected(element, step, opts) {
                        document.cookie = `navActiveStep=${getActiveIndex(opts)}`
                    }
                },
                {
                    element: "#about-tab",
                    popover: {
                        title: "About Us",
                        description:
                            "This is the about page. You can learn more about us here.",
                        // side: "left",
                        // align: "center",
                        // alt: 'Image of an about page'
                        onNextClick() {
                            // when clicking last elements done button close the tour
                            const navigationTour = localStorage.setItem(
                                "navigationTour",
                                "true"
                            );
                            isGuideActive.navigation = false
                            webTour.destroy();
                        },

                    },

                },
            ]);
            // if (document.cookie) {


            if (!isGuideActive.feature && !isGuideActive.contextual) {
                console.log(getLastStep);
                isGuideActive.navigation = true
                webTour.drive(getLastStep);
            } else {
                webTour.destroy()
            }
            // }
            // to start the tour
        } else {
            getActiveIndex('', getLastStep)
            webTour.destroy();
        }
        return webTour;
    }, timeout);
}

// webTour = driver({

//     steps: [

//         {
//             element: '#home-tab',
//             popover: {
//                 title: 'Home Page',
//                 description: 'This is the home page of the website. You can find all of the featured products here.',
//                 side: 'bottom',
//                 align: 'center',
//                 // alt: 'Image of a home page'
//             },
//         },
//         {
//             element: '#order-tab',
//             popover: {
//                 title: 'Order Page',
//                 description: 'This is the order page. You can order food from here.',
//                 side: 'bottom',
//                 align: 'center',
//                 // alt: 'Image of an order page'
//             },
//         },
//         {
//             element: '#contact-tab',
//             popover: {
//                 title: 'Contact Us',
//                 description: 'This is the contact page. You can contact us here.',
//                 side: 'bottom',
//                 align: 'center',
//                 // alt: 'Image of a contact page'
//             },
//         },
//         {
//             element: '#about-tab',
//             popover: {
//                 title: 'About Us',
//                 description: 'This is the about page. You can learn more about us here.',
//                 side: 'left',
//                 align: 'center',
//                 // alt: 'Image of an about page'
//                 onNextClick() {
//                     // when clicking last elements done button close the tour
//                     const navigationTour = localStorage.setItem('navigationTour', "true")
//                     webTour.destroy()
//                 },
//             },
//         },

// {
//     element: "#home-tab",
//     popover: {
//         title: "Home Page",
//         description:
//             "Here you see all featured product and suggestion of products",
//         side: "bottom",
//         align: "center",
//     },
// },
// {
//     element: "#order-tab",
//     popover: {
//         title: "Order Page",
//         description:
//             "By clicking this link you navigate to the order page where you find all the tasty and yummy foods.",
//         side: "bottom",
//         align: "center",
//     },
// },
// {
//     element: "#contact-tab",
//     popover: {
//         title: "Contact-us",
//         description:
//             "By clicking this you will navigate to the contact-us from where you can contact to us.",
//         side: "bottom",
//         align: "center",
//     },
// },
// {
//     element: "#about-tab",
//     popover: {
//         title: "About-us",
//         description:
//             "By clicking this you will navigate to about page where you find about our product and company.",
//         side: "left",
//         align: "center",

//         onNextClick(element, step, opts) {
//             // when clicking last elements done button close the tour
//             const navigationTour = localStorage.setItem('navigationTour', "true")
//             webTour.destroy()
// if (localStorage.getItem('userId')) {
//     if (opts.state.activeIndex) {
//         webTour.moveTo(opts.state.activeIndex + 2)
//     }
// } else {
//     if (opts.state.activeIndex) {
//         webTour.moveTo(opts.state.activeIndex + 1)
//     }
// }
//     }

// },
// },
// {
//     element: "#authentication-tab",
//     popover: {
//         title: "Animated Tour Example",
//         description:
//             "Here is the code example showing animated tour. Let's walk you through it.",
//         side: "left",
//         align: "center",
//         // onPrevClick(element, step, opts) {
//         //     alert('prev click worked')
//         //     if (localStorage.getItem('userId')) {
//         //         if (opts.state.activeIndex) {
//         //             webTour.moveTo(opts.state.activeIndex - 2)
//         //         }
//         //     } else {
//         //         if (opts.state.activeIndex) {
//         //             webTour.moveTo(opts.state.activeIndex - 1)
//         //         }
//         //     }
//         // },
//         onNextClick(element, step, opts) {

//             if (opts.state.activeIndex) {
//                 // alert('next click worked')
//                 webTour.moveTo(opts.state.activeIndex + 2)
//             }
//         }
//     },
// },
// {
//     element: "#profile-tab",
//     popover: {
//         title: "Animated Tour Example",
//         description:
//             "Here is the code example showing animated tour. Let's walk you through it.",
//         side: "left",
//         align: "center",
//         onPrevClick(element, step, opts) {
//             // alert('prev click worked')
//             if (localStorage.getItem('userId')) {
//                 if (opts.state.activeIndex) {
//                     webTour.moveTo(opts.state.activeIndex - 2)
//                 }
//             } else {
//                 if (opts.state.activeIndex) {
//                     webTour.moveTo(opts.state.activeIndex - 1)
//                 }
//             }
//         },
//     },
// },
// {
//     element: "#order-button",
//     popover: {
//         title: "right place",
//         description:
//             "Here is the code example showing animated tour. Let's walk you through it.",
//         side: "left",
//         align: "center",
//         onNextClick() {
//             // when clicking last elements done button close the tour
//             const navigationTour = localStorage.setItem('navigationTour', "true")
//             webTour.destroy()
//         },
//         onPrevClick(element, step, opts) {
//             // alert('prev click worked')
//             if (localStorage.getItem('userId')) {
//                 if (opts.state.activeIndex) {
//                     webTour.moveTo(opts.state.activeIndex - 1)
//                 }
//             } else {
//                 if (opts.state.activeIndex) {
//                     webTour.moveTo(opts.state.activeIndex - 2)
//                 }
//             }
//         },
//     },
// },
// ]
// })
