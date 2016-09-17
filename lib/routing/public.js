Meteor.startup(function () {

    Router.configure({
        notFoundTemplate: 'notFound',
        loadingTemplate: 'loader',
    });

    Router.map(function() {
        this.route("main", {
            path: "/",
            onBeforeAction() {
                this.next()
            },
            template: "main",
            onAfterAction() {
                if (!Meteor.isClient) {
                    return false;
                };
                SEO.set({
                    "title": "Sanus | Welcome to your online medicine portfolio",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Sanus',
                        'image': ''
                    }
                });
                document.title = 'Sanus | Welcome to your online medicine portfolio';
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
                this.next()
            },
            template: "main",
            onAfterAction() {
                if (!Meteor.isClient) {
                    return false;
                };
                SEO.set({
                    "title": "Sanus | Welcome to your online medicine portfolio",
                    "meta" : {
                        'description': '',
                        'keywords': ''
                    },
                    "og" : {
                        'title': 'Welcome to Sanus',
                        'image': ''
                    }
                });
                document.title = 'Sanus | Welcome to your online medicine portfolio';
            },
            data(){
                return ({
                	currentForm: 'login',
                });
            },
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