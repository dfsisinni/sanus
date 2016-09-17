Meteor.startup(function () {

    if (Meteor.isClient) {
        Tracker.autorun(function () {
            if (Meteor.user()) {
                $('body').addClass('bgColorChange');
            } else {
                $('body').removeClass('bgColorChange');
            };
        });
    }

    Router.configure({
        notFoundTemplate: 'notFound',
        loadingTemplate: 'loader',
    });

    Router.map(function() {
        this.route("main", {
            path: "/",
            onBeforeAction() {
                if (Accounts._resetPasswordToken && Session.get('resetPassword') !== null) {
                    Session.set('resetPassword', Accounts._resetPasswordToken);
                    Router.go("/reset-complete");
                };
                if (Accounts._verifyEmailToken) {
                    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
                        if (err) {
                            if (err.message == 'Verify email link expired [403]') {
                                alert('Sorry this verification link has expired.');
                            }
                            else{
                                alert(err.message);
                            };
                        }
                        else {
                            FlowRouter.withReplaceState(function() {
                                FlowRouter.go('/login');
                            });
                            alert("Email verified!");
                        };
                    });
                };
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
        }),

        this.route("about", {
            path: "/about",
            onBeforeAction () {
                this.next()
            },

            template: "about",
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