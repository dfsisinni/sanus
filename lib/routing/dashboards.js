Meteor.startup(function () {
    Router.map(function() {

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
                if (Session.get('isFirstSignup')) {
                    Router.go('/settings');
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


        this.route("medicineView", {
            path: "/med/:medId",
            onBeforeAction() {
                if (typeof Meteor.user() !== 'undefined' && !Meteor.user()) {
                    Router.go('login');
                }
                this.next();
            },
            template: "medicineView",
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


        this.route("medicineEdit", {
            path: "/med/:medId/edit",
            onBeforeAction() {
                if (typeof Meteor.user() !== 'undefined' && !Meteor.user()) {
                    Router.go('login');
                }
                this.next();
            },
            template: "medicineEdit",
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
});