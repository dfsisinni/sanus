Meteor.startup(function () {
    Router.map(function() {
        this.route("searchResult", {
            path: "/search-result",
            onBeforeAction() {
                if (typeof Meteor.user() !== 'undefined' && !Meteor.user()) {
                    Router.go('login');
                }
                this.next();
            },
            template: "searchResultLanding",
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