Meteor.startup(function () {

    Router.configure({
        notFoundTemplate: 'notFound',
        loadingTemplate: 'loader',
    });

    Router.map(function() {
        this.route("main", {
            path: "/",
            onBeforeAction() {
                if (Meteor.user()) {
                    Router.go('dash');
                };
                this.next();
            },
            template: "main",
            onAfterAction() {
                if (!Meteor.isClient) {
                    return false;
                };
                SEO.set({
                    "title": "Sanus | Welcome to your online medicine portfolio.",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Sanus',
                        'image': ''
                    }
                });
                document.title = 'Sanus | Welcome to your online medicine portfolio.';
            },
            data(){
                return ({
                	isSignup: 'login',
                	currentForm: 'signup',
                });
            },
        }),
        this.route("login", {
            path: "/login",
            onBeforeAction() {
                if (Meteor.user()) {
                    Router.go('dash');
                };
                this.next()
            },
            template: "main",
            onAfterAction() {
                if (!Meteor.isClient) {
                    return false;
                };
                SEO.set({
                    "title": "Sanus | Welcome to your online medicine portfolio.",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Sanus',
                        'image': ''
                    }
                });
                document.title = 'Sanus | Welcome to your online medicine portfolio.';
            },
            data(){
                return ({
                    currentForm: 'login',
                });
            },
        }),
        this.route("reset", {
            path: "/reset",
            onBeforeAction() {
                if (Meteor.user()) {
                    Router.go('dash');
                };
                this.next();
            },
            template: "reset",
            onAfterAction() {
                if (!Meteor.isClient) {
                    return false;
                };
                SEO.set({
                    "title": "Reset your password.",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Sanus',
                        'image': ''
                    }
                });
                document.title = 'Reset your password.';
            },
        }),
        this.route("resetComplete", {
            path: "/reset-complete",
            onBeforeAction() {
                if (Meteor.user()) {
                    Router.go('dash');
                };
                this.next();
            },
            template: "resetComplete",
            onAfterAction() {
                if (!Meteor.isClient) {
                    return false;
                };
                SEO.set({
                    "title": "Reset your password.",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Sanus',
                        'image': ''
                    }
                });
                document.title = 'Reset your password.';
            },
        }),

        this.route("dash", {
            path: "/dash",
            onBeforeAction() {
                if (typeof Meteor.user() !== 'undefined' && !Meteor.user()) {
                    Router.go('login');
                }
                this.next()
            },
            template: "dash",
            onAfterAction() {
                if (!Meteor.isClient) {
                    return false;
                };
                SEO.set({
                    "title": "Sanus | Welcome to your online medicine portfolio.",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Sanus',
                        'image': ''
                    }
                });
                document.title = 'Sanus | Welcome to your online medicine portfolio.';
            }
        })
    })


    if (Meteor.isClient) {
        return SEO.config({
            "title": "Sanus",
            "meta" : {
                'description': '',
                'keywords': ''
            },
            "og" : {
                'title': 'Sanus',
                'image': ''
            }
        });
    };
});