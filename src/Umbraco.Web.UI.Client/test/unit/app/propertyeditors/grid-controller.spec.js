/*globals jasmine*/

describe("grid 2", function () {

    var controller,
        scope,
        gridResource,
        angularHelper,
        q,
        gridEditors = [
            {
                "id": 1061,
                "key": "859fcc96-b3b2-4dbc-8c95-b3489a665374",
                "name": "Header",
                "alias": "headline",
                "icon": "icon-document",
                "views": {
                     "value": {
                         "view": "views/propertyeditors/textbox/textbox.inline.html",
                         "isPreview": false
                     }
                }
            }, {
                "id": 1066,
                "key": "a0257a59-0dd5-4468-8221-bedfd8d14911",
                "name": "Rich Text",
                "alias": "richText",
                "icon": "icon-document",
                "views": {}
            }
        ],
        scaffold = {
            "tabs": [
                {
                    "id": 12,
                    "active": true,
                    "label": "Inline",
                    "alias": "Inline",
                    "properties": [
                        {
                            "label": "Value",
                            "description": null,
                            "view": "textbox",
                            "config": {
                                 "maxChars": null
                            },
                            "hideLabel": false,
                            "validation": {
                                "mandatory": false,
                                "pattern": null
                            },
                            "readonly": false,
                            "id": 0,
                            "value": "",
                            "alias": "value",
                            "editor": "Umbraco.TextBox",
                            "isSensitive": false
                        }]
                }
            ],
            "updateDate": "0001-01-01T00:00:00",
            "createDate": "0001-01-01T00:00:00",
            "published": false,
            "edited": false,
            "owner": null,
            "updater": null,
            "contentTypeAlias": "headline",
            "sortOrder": 0,
            "name": null,
            "id": 0,
            "udi": "umb://document/5cafb65193f1477ca13d5181565f67c0",
            "icon": "icon-document",
            "trashed": false,
            "key": "5cafb651-93f1-477c-a13d-5181565f67c0",
            "parentId": -1,
            "alias": null,
            "path": null,
            "metaData": {}
        },
        // These are populated at the bottom of this file
        fullModel,
        idealModel;

    beforeEach(module('umbraco'));

    beforeEach(inject(function (
        $rootScope,
        $controller,
        $q
    ) {
        q = $q;
        scope = $rootScope.$new();

        scope.model = JSON.parse(JSON.stringify(fullModel));

        gridResource = {
            getGridContentTypes: function () {
                var def = q.defer();
                def.resolve(gridEditors);
                return def.promise;
            },
            getScaffold: function (guid) {
                var def = q.defer();
                def.resolve(scaffold);
                return def.promise;
            }
        }

        angularHelper = {
            getCurrentForm: function () {
                return {
                    $setDirty: function () {
                        var iRememberBeingDirty = true;
                    }
                }
            }
        }

        controller = $controller("Umbraco.PropertyEditors.Grid2Controller", {
            "$scope": scope,
            "gridResource": gridResource,
            "angularHelper": angularHelper
        });

        //fixme - Disable digest while we don't have the right logic
        scope.$digest();
    }));

    it("defaults to 12 columns", function () {
        expect(scope.model.config.items.columns).toBe(12);
    });

    it("when only one layout and row config, adds layout and row", function () {
        expect(scope.model.value.sections[0].rows[0]).toBeDefined();
    });

    it("shows add editor dialog", function () {
        expect(scope.editorOverlay).toBeUndefined();
        scope.openEditorOverlay(
            {},
            scope.model.value.sections[0].rows[0].areas[0],
            0,
            ""
        );
        expect(scope.editorOverlay).toEqual(jasmine.objectContaining({
            view: "itempicker"
        }));
    });

    it("adds editor to cell",
        function () {
            scope.addControl(
                gridEditors[0],
                scope.model.value.sections[0].rows[0].areas[0],
                0
            );

            expect(scope.model.value.sections[0].rows[0].areas[0].controls[0]).toEqual(jasmine.objectContaining({
                value: null,
                editor: jasmine.objectContaining({
                    alias: "headline"
                })
            }));
        });

    it("maps the model to persistable model",
        function () {
            var persistable = scope.mapToPersistableModel(fullModel.value);

            expect(persistable).toEqual(jasmine.objectContaining({
                rows: [
                    {
                        alias: "halfNHalf",
                        settings: {},
                        cells: [
                            {
                                settings: {},
                                items: [
                                    {
                                        type: "859fcc96-b3b2-4dbc-8c95-b3489a665374",
                                        values: {
                                            value: "Hello world"
                                        }
                                    },
                                    {
                                        type: "859fcc96-b3b2-4dbc-8c95-b3489a665374",
                                        values: {
                                            value: "H5YR, World!"
                                        }
                                    }
                                ]
                            },
                            {
                                settings: {},
                                items: [
                                    {
                                        type: "a0257a59-0dd5-4468-8221-bedfd8d14911",
                                        values: {
                                            content: "<p><strong>afsdfsadf</strong></p>\n<p><strong><img style=\"width: 500px; height:331.1360677083333px;\" src=\"/media/1001/analytics-blur-close-up-590020.jpg?width=500&amp;height=331.1360677083333\" alt=\"\" data-udi=\"umb://media/a701f1cd119f4324998de916b1fef117\" /></strong></p>\n<p> </p>\n<p>asdfasdf</p>"
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }));

        });

    idealModel = {
        config: {
            columns: 12,
            rows: [
                {
                    alias: "fullwidth",
                    Name: "Full width",
                    settingsType: "5C25DA30-822E-4E39-BDD5-1D86058323E3",
                    cells: [
                        {
                            colspan: 8,
                            // Main column settings
                            settingsType: "B994CB2F-D5A0-48DD-A8BA-AD8E4970B216",
                            allowAll: false,
                            allowed: [
                                "84ADAEB2-BB42-4069-BCA8-52605158ECD2"
                            ]
                        },
                        {
                            colspan: 4,
                            // Sidebar settings
                            settingsType: "5DBC34A6-FEF5-4169-93BB-05CAB5344663",
                            allowAll: true,
                            allowed: []
                        }
                    ]
                }
            ]
        },
        value: {
            rows: [
                {
                    alias: "fullwidth",
                    settings: {
                        classNames: "fancy row",
                        backgroundImage: "0BAD7ABF-F423-4336-A6A4-F00AF1815971"
                    },
                    cells: [
                        {
                            settings: {
                                type: "B994CB2F-D5A0-48DD-A8BA-AD8E4970B216",
                                values: {
                                    classNames: "fancy cell",
                                    backgroundImage: "9805F5A9-D6F7-4981-88F7-2F2644ED0759"
                                }
                            },
                            items: [
                                {
                                    type: "84ADAEB2-BB42-4069-BCA8-52605158ECD2",
                                    values: {
                                        "headline": "Welcome to the fantastic site"
                                    }
                                }
                            ]
                        },
                        {
                            settings: {
                                type: "5DBC34A6-FEF5-4169-93BB-05CAB5344663",
                                values: {
                                    classNames: "sidebar cell",
                                    sidebarSetting: "some other setting"
                                }
                            },
                            items: [
                                {
                                    type: "DBAD0C5C-95F2-4DF8-A888-C84B24DA1962",
                                    values: {
                                        "links": [
                                            "47873858-D92B-4D9F-90C0-04A6C14954FF",
                                            "F0814EF0-E356-44F3-911F-AF2A1B209223"
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    };

    fullModel = {
        "label": "Grid",
        "description": null,
        "view": "grid2",
        "config": {
            "items": {
                "styles": [
                    {
                        "label": "Set a background image",
                        "description": "Set a row background",
                        "key": "background-image",
                        "view": "imagepicker",
                        "modifier": "url({0})"
                    }
                ],
                "config": [
                    {
                        "label": "Class",
                        "description": "Set a css class",
                        "key": "class",
                        "view": "textstring"
                    }
                ],
                "columns": 12,
                "templates": [
                    {
                        "name": "1 column layout",
                        "sections": [
                            {
                                "grid": 12
                            }
                        ]
                    }
                ],
                "layouts": [
                    {
                        "label": "Headline",
                        "name": "Headline",
                        "areas": [
                            {
                                "grid": 12,
                                "editors": [
                                    "headline"
                                ]
                            }
                        ]
                    },
                    {
                        "name": "halfNHalf",
                        "areas": [
                            {
                                "grid": 6
                            },
                            {
                                "grid": 6
                            }
                        ],
                        "label": "Half n Half"
                    }
                ]
            }
        },
        "hideLabel": true,
        "validation": {
            "mandatory": false,
            "pattern": null
        },
        "readonly": false,
        "id": 0,
        "value": {
            "name": "1 column layout",
            "sections": [
                {
                    "grid": 12,
                    "rows": [
                        {
                            "name": "halfNHalf",
                            "areas": [
                                {
                                    "grid": 6,
                                    "hasConfig": false,
                                    "controls": [
                                        {
                                            "value": null,
                                            "editor": {
                                                "id": 1061,
                                                "key": "859fcc96-b3b2-4dbc-8c95-b3489a665374",
                                                "name": {},
                                                "alias": "headline",
                                                "icon": "icon-document",
                                                "views": [
                                                    "views/propertyeditors/textbox/textbox.inline.html"
                                                ]
                                            },
                                            "active": false,
                                            "properties": [
                                                {
                                                    "label": "Value",
                                                    "description": null,
                                                    "view": "textbox",
                                                    "config": {
                                                        "maxChars": 500
                                                    },
                                                    "hideLabel": true,
                                                    "validation": {
                                                        "mandatory": false,
                                                        "pattern": null
                                                    },
                                                    "readonly": false,
                                                    "id": 0,
                                                    "value": "Hello world",
                                                    "alias": "value",
                                                    "editor": "Umbraco.TextBox",
                                                    "isSensitive": false,
                                                    "maxlength": false,
                                                    "count": 489
                                                }
                                            ]
                                        },
                                        {
                                            "value": null,
                                            "editor": {
                                                "id": 1061,
                                                "key": "859fcc96-b3b2-4dbc-8c95-b3489a665374",
                                                "name": {},
                                                "alias": "headline",
                                                "icon": "icon-document",
                                                "views": [
                                                    "views/propertyeditors/textbox/textbox.inline.html"
                                                ]
                                            },
                                            "active": false,
                                            "properties": [
                                                {
                                                    "label": "Value",
                                                    "description": null,
                                                    "view": "textbox",
                                                    "config": {
                                                        "maxChars": 500
                                                    },
                                                    "hideLabel": true,
                                                    "validation": {
                                                        "mandatory": false,
                                                        "pattern": null
                                                    },
                                                    "readonly": false,
                                                    "id": 0,
                                                    "value": "H5YR, World!",
                                                    "alias": "value",
                                                    "editor": "Umbraco.TextBox",
                                                    "isSensitive": false,
                                                    "maxlength": false,
                                                    "count": 488
                                                }
                                            ]
                                        }
                                    ],
                                    "active": false
                                },
                                {
                                    "grid": 6,
                                    "hasConfig": false,
                                    "controls": [
                                        {
                                            "value": null,
                                            "editor": {
                                                "id": 1066,
                                                "key": "a0257a59-0dd5-4468-8221-bedfd8d14911",
                                                "name": "Rich Text",
                                                "alias": "richText",
                                                "icon": "icon-document",
                                                "views": []
                                            },
                                            "active": false,
                                            "properties": [
                                                {
                                                    "label": "Content",
                                                    "description": null,
                                                    "view": "rte",
                                                    "config": {
                                                        "editor": null,
                                                        "hideLabel": false
                                                    },
                                                    "hideLabel": true,
                                                    "validation": {
                                                        "mandatory": false,
                                                        "pattern": null
                                                    },
                                                    "readonly": false,
                                                    "id": 0,
                                                    "value":
                                                    "<p><strong>afsdfsadf</strong></p>\n<p><strong><img style=\"width: 500px; height:331.1360677083333px;\" src=\"/media/1001/analytics-blur-close-up-590020.jpg?width=500&amp;height=331.1360677083333\" alt=\"\" data-udi=\"umb://media/a701f1cd119f4324998de916b1fef117\" /></strong></p>\n<p> </p>\n<p>asdfasdf</p>",
                                                    "alias": "content",
                                                    "editor": "Umbraco.TinyMCEv3",
                                                    "isSensitive": false
                                                }
                                            ]
                                        }
                                    ],
                                    "active": false
                                }
                            ],
                            "label": "Half n Half",
                            "hasConfig": false,
                            "id": "e0193d47-e799-861d-47d7-274e3fa5f1a3",
                            "active": false
                        }
                    ]
                }
            ]
        },
        "alias": "grid",
        "editor": "Umbraco.Grid2",
        "isSensitive": false
    };

});
