var x = {
    "_id" : ObjectId("56d3f3faa3caef481186fd06"),
    "id" : "02090433244256412110",
    "name" : "Sony Liv Demo",
    "description" : "to add fields similar to sony and test",
    "updated_at" : ISODate("2016-02-29T07:32:10.790Z"),
    "created_at" : ISODate("2016-02-29T07:32:10.790Z"),
    "rules" : [
        {
            "name" : "Web-Dev",
            "description" : "web for development envirnment",
            "id" : "71552511581262141201",
            "applicationId" : "81513162174212651379",
            "profileId" : "83145219261033181001"
        },
        {
            "name" : "Web-STG",
            "description" : "web for staging envirnment",
            "id" : "19129715713224850165",
            "applicationId" : "81513162174212651379",
            "profileId" : "61212131935125251765"
        },
        {
            "name" : "Web-PRD",
            "description" : "for production envirnment",
            "id" : "61341871531002421043",
            "applicationId" : "81513162174212651379",
            "profileId" : "61155491657570101055"
        },
        {
            "name" : "IOS-DEV",
            "description" : "development rule for IOS",
            "id" : "21421202722381822021",
            "applicationId" : "11848106301671241221",
            "profileId" : "88664069747441321302"
        },
        {
            "name" : "ANDROID-DEV",
            "description" : "android rule for development",
            "id" : "01291207169982815520",
            "applicationId" : "01822171351061093673",
            "profileId" : "21768813412578225025"
        }
    ],
    "applications" : [
        {
            "id" : "81513162174212651379",
            "name" : "WebApplication"
        },
        {
            "name" : "iosApplication",
            "description" : null,
            "id" : "11848106301671241221"
        },
        {
            "name" : "AndroidApplication",
            "description" : null,
            "id" : "01822171351061093673"
        }
    ],
    "__v" : 0,
    "sections" : [
        {
            "name" : "Languages",
            "description" : "sadasd",
            "id" : "01951641151291832751"
        },
        {
            "name" : "Pages",
            "description" : null,
            "id" : "01020221218141245126"
        },
        {
            "name" : "System",
            "description" : null,
            "id" : "91015409103147740929"
        },
        {
            "name" : "Sitemap",
            "description" : null,
            "id" : "11181511481301291689"
        }
    ],
    "fields" : [
        {
            "name" : "Default Language",
            "key" : "default_language",
            "type" : "list",
            "sectionId" : "01951641151291832751",
            "id" : "01818420917582143234",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "value" : ""
                },
                {
                    "id" : "options",
                    "name" : "Options",
                    "type" : "dynamicDropdown",
                    "data" : [
                        {
                            "name" : "en_US",
                            "value" : "en_US",
                            "id" : "75418717297192265192"
                        },
                        {
                            "name" : "Malayalam",
                            "value" : "en_mal",
                            "id" : "21912225415737301857"
                        }
                    ]
                }
            ]
        },
        {
            "name" : "Language List",
            "key" : "language_list",
            "type" : "complex",
            "sectionId" : "01951641151291832751",
            "id" : "81221693917112181801",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Language Id",
                    "key" : "language_id",
                    "type" : "text",
                    "id" : "12678028012415131554"
                },
                {
                    "name" : "Language Name",
                    "key" : "language_name",
                    "type" : "text",
                    "id" : "31291591471025717278"
                }
            ],
            "childId" : "31291591471025717278"
        },
        {
            "name" : "Language Id",
            "key" : "language_id",
            "type" : "text",
            "parentId" : "81221693917112181801",
            "id" : "12678028012415131554",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Language Name",
            "key" : "language_name",
            "type" : "text",
            "parentId" : "81221693917112181801",
            "id" : "31291591471025717278",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Bands",
            "key" : "bands",
            "type" : "complex",
            "sectionId" : "01020221218141245126",
            "id" : "61102801032451341521",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "count",
                    "key" : "count",
                    "type" : "text",
                    "id" : "71932732842781969186"
                },
                {
                    "name" : "data",
                    "key" : "data",
                    "type" : "text",
                    "id" : "22841498611618988141"
                },
                {
                    "name" : "Enable language filter",
                    "key" : "enable_language_filter",
                    "type" : "boolean",
                    "id" : "88519215219211011919"
                },
                {
                    "name" : "Enable Sort Filter",
                    "key" : "enable_sort_filter",
                    "type" : "boolean",
                    "id" : "22559615428195102173"
                },
                {
                    "name" : "id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "32511902491988521167"
                },
                {
                    "name" : "Image Url",
                    "key" : "image_url",
                    "type" : "text",
                    "id" : "91332020219328125561"
                },
                {
                    "name" : "Meta title",
                    "key" : "meta_title",
                    "type" : "text",
                    "id" : "12531421321392114944"
                },
                {
                    "name" : "See All Options",
                    "key" : "see_all_options",
                    "type" : "boolean",
                    "id" : "94269498416027718818"
                },
                {
                    "name" : "sort",
                    "key" : "sort",
                    "type" : "text",
                    "id" : "35120605642635718278"
                },
                {
                    "name" : "title",
                    "key" : "title",
                    "type" : "text",
                    "id" : "84394261861133527419"
                },
                {
                    "name" : "Type",
                    "key" : "type",
                    "type" : "list",
                    "id" : "21451928389210996162"
                },
                {
                    "name" : "Vmax Ad Unit Id or DFP Ad Unit Id",
                    "key" : "vmax_ad_unit_id_or_dfp_ad_unit_id",
                    "type" : "text",
                    "id" : "90511313589142831728"
                },
                {
                    "name" : "Template Id",
                    "key" : "template_id",
                    "type" : "template",
                    "id" : "02822352321060029126"
                },
                {
                    "name" : "view",
                    "key" : "view",
                    "type" : "list",
                    "id" : "32451641024427213261"
                },
                {
                    "name" : "Action",
                    "key" : "action",
                    "type" : "list",
                    "id" : "01542191351961431971"
                }
            ],
            "childId" : "01542191351961431971",
            "valueList" : {
                "83145219261033181001" : [
                    {
                        "id" : "22622320194134061535",
                        "name" : "Home - Live Matches - Masthead"
                    },
                    {
                        "id" : "11271212650711421479",
                        "name" : "Home - Masthead - 1"
                    },
                    {
                        "id" : "32938225210613385451",
                        "name" : "Home - Masthead - CstmBnr - 3"
                    },
                    {
                        "id" : "91422041024424349178",
                        "name" : "Home - LIVE Matches"
                    },
                    {
                        "id" : "22811147412426317659",
                        "name" : "Home - Event"
                    },
                    {
                        "id" : "81731297316264196043",
                        "name" : "Home - Latest Episode"
                    },
                    {
                        "id" : "91312114019016914319",
                        "name" : "Home - Box Office Hits"
                    },
                    {
                        "id" : "13263743206131641241",
                        "name" : "Home - Power Couple"
                    },
                    {
                        "id" : "65815319747212715427",
                        "name" : "Home - LIV Tech Videos"
                    },
                    {
                        "id" : "22816175242041522211",
                        "name" : "Home - Sports"
                    },
                    {
                        "id" : "84713611842237898901",
                        "name" : "Sports - ATP 500 - Rio Open"
                    },
                    {
                        "id" : "31502211012412960213",
                        "name" : "Sports - Cricket"
                    },
                    {
                        "id" : "79116584072813190163",
                        "name" : "Sports - Tennis"
                    },
                    {
                        "id" : "51712124012029325593",
                        "name" : "Movie Action"
                    },
                    {
                        "id" : "12175971861261150211",
                        "name" : "Rent A Movie"
                    },
                    {
                        "id" : "21626111259897152273",
                        "name" : "All Show"
                    }
                ],
                "21768813412578225025" : [
                    {
                        "id" : "22622320194134061535",
                        "name" : "Home - Live Matches - Masthead"
                    },
                    {
                        "id" : "11271212650711421479",
                        "name" : "Home - Masthead - 1"
                    },
                    {
                        "id" : "32938225210613385451",
                        "name" : "Home - Masthead - CstmBnr - 3"
                    },
                    {
                        "id" : "91422041024424349178",
                        "name" : "Home - LIVE Matches"
                    },
                    {
                        "id" : "22811147412426317659",
                        "name" : "Home - Event"
                    },
                    {
                        "id" : "81731297316264196043",
                        "name" : "Home - Latest Episode"
                    },
                    {
                        "id" : "91312114019016914319",
                        "name" : "Home - Box Office Hits"
                    },
                    {
                        "id" : "13263743206131641241",
                        "name" : "Home - Power Couple"
                    },
                    {
                        "id" : "65815319747212715427",
                        "name" : "Home - LIV Tech Videos"
                    },
                    {
                        "id" : "22816175242041522211",
                        "name" : "Home - Sports"
                    },
                    {
                        "id" : "84713611842237898901",
                        "name" : "Sports - ATP 500 - Rio Open"
                    },
                    {
                        "id" : "31502211012412960213",
                        "name" : "Sports - Cricket"
                    },
                    {
                        "id" : "79116584072813190163",
                        "name" : "Sports - Tennis"
                    },
                    {
                        "id" : "51712124012029325593",
                        "name" : "Movie Action"
                    },
                    {
                        "id" : "12175971861261150211",
                        "name" : "Rent A Movie"
                    },
                    {
                        "id" : "21626111259897152273",
                        "name" : "All Show"
                    }
                ],
                "88664069747441321302" : [
                    {
                        "id" : "22622320194134061535",
                        "name" : "Home - Live Matches - Masthead"
                    },
                    {
                        "id" : "11271212650711421479",
                        "name" : "Home - Masthead - 1"
                    },
                    {
                        "id" : "32938225210613385451",
                        "name" : "Home - Masthead - CstmBnr - 3"
                    },
                    {
                        "id" : "91422041024424349178",
                        "name" : "Home - LIVE Matches"
                    },
                    {
                        "id" : "22811147412426317659",
                        "name" : "Home - Event"
                    },
                    {
                        "id" : "81731297316264196043",
                        "name" : "Home - Latest Episode"
                    },
                    {
                        "id" : "91312114019016914319",
                        "name" : "Home - Box Office Hits"
                    },
                    {
                        "id" : "13263743206131641241",
                        "name" : "Home - Power Couple"
                    },
                    {
                        "id" : "65815319747212715427",
                        "name" : "Home - LIV Tech Videos"
                    },
                    {
                        "id" : "22816175242041522211",
                        "name" : "Home - Sports"
                    },
                    {
                        "id" : "84713611842237898901",
                        "name" : "Sports - ATP 500 - Rio Open"
                    },
                    {
                        "id" : "31502211012412960213",
                        "name" : "Sports - Cricket"
                    },
                    {
                        "id" : "79116584072813190163",
                        "name" : "Sports - Tennis"
                    },
                    {
                        "id" : "51712124012029325593",
                        "name" : "Movie Action"
                    },
                    {
                        "id" : "12175971861261150211",
                        "name" : "Rent A Movie"
                    },
                    {
                        "id" : "21626111259897152273",
                        "name" : "All Show"
                    }
                ],
                "21252752754279425798" : [
                    {
                        "id" : "91812861981422222786",
                        "name" : "test"
                    }
                ]
            }
        },
        {
            "name" : "Meta tags",
            "key" : "meta_tags",
            "type" : "complex",
            "sectionId" : "01020221218141245126",
            "id" : "47213112219129312153",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "no",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Meta tag",
                    "key" : "meta_tag",
                    "type" : "text",
                    "id" : "51842038211411512110"
                },
                {
                    "name" : "Meta title",
                    "key" : "meta_title",
                    "type" : "text",
                    "id" : "16316510311148128131"
                }
            ],
            "childId" : "16316510311148128131"
        },
        {
            "name" : "Pages",
            "key" : "pages",
            "type" : "complex",
            "sectionId" : "01020221218141245126",
            "id" : "81051756942123360149",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "yes",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Bands",
                    "key" : "bands",
                    "type" : "complex",
                    "id" : "02795014710126412332"
                },
                {
                    "name" : "id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "01971302133413126118"
                },
                {
                    "name" : "Title",
                    "key" : "title",
                    "type" : "text",
                    "id" : "02783301240105219513"
                },
                {
                    "name" : "Type",
                    "key" : "type",
                    "type" : "list",
                    "id" : "42141002521115619219"
                },
                {
                    "name" : "Forms",
                    "key" : "forms",
                    "type" : "complex",
                    "id" : "81977317015258180179"
                }
            ],
            "childId" : "81977317015258180179",
            "valueList" : {
                "83145219261033181001" : [
                    {
                        "id" : "02581521964728233111",
                        "name" : "HOME"
                    },
                    {
                        "id" : "11702442802475614314",
                        "name" : "SHOWS"
                    },
                    {
                        "id" : "84851941745285153801",
                        "name" : "MOVIES"
                    },
                    {
                        "id" : "21451205213721871941",
                        "name" : "SPORTS"
                    },
                    {
                        "id" : "61830912510119703266",
                        "name" : "PREMIUM OFFERINGS"
                    },
                    {
                        "id" : "97324514365528129140",
                        "name" : "SETTINGS"
                    },
                    {
                        "id" : "77517652818180275621",
                        "name" : "MCL"
                    },
                    {
                        "id" : "16278364029322311819",
                        "name" : "POWER COUPLE"
                    },
                    {
                        "id" : "22014867941732021749",
                        "name" : "SIGNUP"
                    }
                ],
                "21768813412578225025" : [
                    {
                        "id" : "02581521964728233111",
                        "name" : "HOME"
                    },
                    {
                        "id" : "11702442802475614314",
                        "name" : "SHOWS"
                    },
                    {
                        "id" : "84851941745285153801",
                        "name" : "MOVIES"
                    },
                    {
                        "id" : "21451205213721871941",
                        "name" : "SPORTS"
                    },
                    {
                        "id" : "61830912510119703266",
                        "name" : "PREMIUM OFFERINGS"
                    },
                    {
                        "id" : "97324514365528129140",
                        "name" : "SETTINGS"
                    },
                    {
                        "id" : "77517652818180275621",
                        "name" : "MCL"
                    },
                    {
                        "id" : "16278364029322311819",
                        "name" : "POWER COUPLE"
                    },
                    {
                        "id" : "22014867941732021749",
                        "name" : "SIGNUP"
                    }
                ],
                "88664069747441321302" : [
                    {
                        "id" : "02581521964728233111",
                        "name" : "HOME"
                    },
                    {
                        "id" : "11702442802475614314",
                        "name" : "SHOWS"
                    },
                    {
                        "id" : "84851941745285153801",
                        "name" : "MOVIES"
                    },
                    {
                        "id" : "21451205213721871941",
                        "name" : "SPORTS"
                    },
                    {
                        "id" : "61830912510119703266",
                        "name" : "PREMIUM OFFERINGS"
                    },
                    {
                        "id" : "97324514365528129140",
                        "name" : "SETTINGS"
                    },
                    {
                        "id" : "77517652818180275621",
                        "name" : "MCL"
                    },
                    {
                        "id" : "16278364029322311819",
                        "name" : "POWER COUPLE"
                    },
                    {
                        "id" : "22014867941732021749",
                        "name" : "SIGNUP"
                    }
                ]
            }
        },
        {
            "name" : "count",
            "key" : "count",
            "type" : "text",
            "parentId" : "61102801032451341521",
            "id" : "71932732842781969186",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "data",
            "key" : "data",
            "type" : "text",
            "parentId" : "61102801032451341521",
            "id" : "22841498611618988141",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Enable language filter",
            "key" : "enable_language_filter",
            "type" : "boolean",
            "parentId" : "61102801032451341521",
            "id" : "88519215219211011919",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Enable Sort Filter",
            "key" : "enable_sort_filter",
            "type" : "boolean",
            "parentId" : "61102801032451341521",
            "id" : "22559615428195102173",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "id",
            "key" : "id",
            "type" : "text",
            "parentId" : "61102801032451341521",
            "id" : "32511902491988521167",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Image Url",
            "key" : "image_url",
            "type" : "text",
            "parentId" : "61102801032451341521",
            "id" : "91332020219328125561",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Meta title",
            "key" : "meta_title",
            "type" : "text",
            "parentId" : "61102801032451341521",
            "id" : "12531421321392114944",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "See All Options",
            "key" : "see_all_options",
            "type" : "boolean",
            "parentId" : "61102801032451341521",
            "id" : "94269498416027718818",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "sort",
            "key" : "sort",
            "type" : "text",
            "parentId" : "61102801032451341521",
            "id" : "35120605642635718278",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "title",
            "key" : "title",
            "type" : "text",
            "parentId" : "61102801032451341521",
            "id" : "84394261861133527419",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Type",
            "key" : "type",
            "type" : "list",
            "parentId" : "61102801032451341521",
            "id" : "21451928389210996162",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                },
                {
                    "id" : "options",
                    "name" : "Options",
                    "type" : "dynamicDropdown",
                    "data" : [
                        {
                            "name" : "Manual",
                            "value" : "manual",
                            "id" : "01171671175911522844"
                        },
                        {
                            "name" : "Folders",
                            "value" : "folders",
                            "id" : "02290468100287145029"
                        },
                        {
                            "name" : "Google Add",
                            "value" : "googleAdd",
                            "id" : "11872120728180144591"
                        },
                        {
                            "name" : "Seacrh",
                            "value" : "seacrh",
                            "id" : "81212042061621741118"
                        }
                    ]
                }
            ]
        },
        {
            "name" : "Vmax Ad Unit Id or DFP Ad Unit Id",
            "key" : "vmax_ad_unit_id_or_dfp_ad_unit_id",
            "type" : "text",
            "parentId" : "61102801032451341521",
            "id" : "90511313589142831728",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Meta tag",
            "key" : "meta_tag",
            "type" : "text",
            "parentId" : "47213112219129312153",
            "id" : "51842038211411512110",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Meta title",
            "key" : "meta_title",
            "type" : "text",
            "parentId" : "47213112219129312153",
            "id" : "16316510311148128131",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Bands",
            "key" : "bands",
            "type" : "complex",
            "parentId" : "81051756942123360149",
            "id" : "02795014710126412332",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "91361931447176116194"
                }
            ],
            "childId" : "91361931447176116194",
            "valueList" : {
                "83145219261033181001" : [
                    {
                        "id" : "21721117417518891102",
                        "name" : "Sports",
                        "parentValueId" : "02581521964728233111"
                    },
                    {
                        "id" : "02341363252832101551",
                        "name" : "Sports Cricket",
                        "parentValueId" : "11702442802475614314"
                    },
                    {
                        "id" : "82971196481291731281",
                        "name" : "Rent A Movie",
                        "parentValueId" : "02581521964728233111"
                    },
                    {
                        "id" : "01545616646199771821",
                        "name" : "Movie Action",
                        "parentValueId" : "02581521964728233111"
                    },
                    {
                        "id" : "66134541027618813115",
                        "name" : "Latest Episodes",
                        "parentValueId" : "02581521964728233111"
                    }
                ],
                "21768813412578225025" : [
                    {
                        "id" : "21721117417518891102",
                        "name" : "Sports",
                        "parentValueId" : "02581521964728233111"
                    },
                    {
                        "id" : "02341363252832101551",
                        "name" : "Sports Cricket",
                        "parentValueId" : "11702442802475614314"
                    },
                    {
                        "id" : "82971196481291731281",
                        "name" : "Rent A Movie",
                        "parentValueId" : "02581521964728233111"
                    },
                    {
                        "id" : "01545616646199771821",
                        "name" : "Movie Action",
                        "parentValueId" : "02581521964728233111"
                    },
                    {
                        "id" : "66134541027618813115",
                        "name" : "Latest Episodes",
                        "parentValueId" : "02581521964728233111"
                    }
                ],
                "88664069747441321302" : [
                    {
                        "id" : "21721117417518891102",
                        "name" : "Sports",
                        "parentValueId" : "02581521964728233111"
                    },
                    {
                        "id" : "02341363252832101551",
                        "name" : "Sports Cricket",
                        "parentValueId" : "11702442802475614314"
                    },
                    {
                        "id" : "82971196481291731281",
                        "name" : "Rent A Movie",
                        "parentValueId" : "02581521964728233111"
                    },
                    {
                        "id" : "01545616646199771821",
                        "name" : "Movie Action",
                        "parentValueId" : "02581521964728233111"
                    },
                    {
                        "id" : "66134541027618813115",
                        "name" : "Latest Episodes",
                        "parentValueId" : "02581521964728233111"
                    }
                ]
            }
        },
        {
            "name" : "id",
            "key" : "id",
            "type" : "text",
            "parentId" : "81051756942123360149",
            "id" : "01971302133413126118",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Title",
            "key" : "title",
            "type" : "text",
            "parentId" : "81051756942123360149",
            "id" : "02783301240105219513",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "id",
            "key" : "id",
            "type" : "text",
            "parentId" : "02795014710126412332",
            "id" : "91361931447176116194",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "App Configurations",
            "key" : "app_configurations",
            "type" : "complex",
            "sectionId" : "91015409103147740929",
            "id" : "01582193223242254101",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "no",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Ad config List",
                    "key" : "ad_config_list",
                    "type" : "complex",
                    "id" : "24521701438325554264"
                },
                {
                    "name" : "Advertise with us",
                    "key" : "advertise_with_us",
                    "type" : "text",
                    "id" : "02464381622042091342"
                },
                {
                    "name" : "App Version",
                    "key" : "app_version",
                    "type" : "complex",
                    "id" : "64512589191977513793"
                },
                {
                    "name" : "AppGrid Cache Time",
                    "key" : "appgrid_cache_time",
                    "type" : "text",
                    "id" : "01951481671093121681"
                },
                {
                    "name" : "Language filter options",
                    "key" : "language_filter_options",
                    "type" : "complex",
                    "id" : "45010318319200293981"
                },
                {
                    "name" : "OVP Cache Time",
                    "key" : "ovp_cache_time",
                    "type" : "text",
                    "id" : "57322943184712692149"
                },
                {
                    "name" : "Payment Options",
                    "key" : "payment_options",
                    "type" : "complex",
                    "id" : "51451361031944500237"
                },
                {
                    "name" : "Re-Captcha Key",
                    "key" : "re-captcha_key",
                    "type" : "text",
                    "id" : "81051869213819225896"
                },
                {
                    "name" : "Share Options",
                    "key" : "share_options",
                    "type" : "complex",
                    "id" : "63212883641551842702"
                },
                {
                    "name" : "SMS Sender",
                    "key" : "sms_sender",
                    "type" : "text",
                    "id" : "51059893260101946372"
                },
                {
                    "name" : "Sorting Filter",
                    "key" : "sorting_filter",
                    "type" : "complex",
                    "id" : "61052227861201551324"
                }
            ],
            "childId" : "61052227861201551324"
        },
        {
            "name" : "Details Page",
            "key" : "details_page",
            "type" : "complex",
            "sectionId" : "91015409103147740929",
            "id" : "32061437517311661622",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Details Page type",
                    "key" : "details_page_type",
                    "type" : "list",
                    "id" : "32731091316714216818"
                },
                {
                    "name" : "ID",
                    "key" : "id",
                    "type" : "text",
                    "id" : "32811861542622334813"
                },
                {
                    "name" : "Vmax Ads/ Google DFP ads",
                    "key" : "vmax_ads/_google_dfp_ads",
                    "type" : "text",
                    "id" : "44413118117873239128"
                }
            ],
            "childId" : "44413118117873239128"
        },
        {
            "name" : "gateways",
            "key" : "gateways",
            "type" : "complex",
            "sectionId" : "91015409103147740929",
            "id" : "41091291859826902632",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "no",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Auth Gateway",
                    "key" : "auth_gateway",
                    "type" : "text",
                    "id" : "02902651542869710674"
                },
                {
                    "name" : "CMS Gateway",
                    "key" : "cms_gateway",
                    "type" : "text",
                    "id" : "67020317252501552180"
                },
                {
                    "name" : "Image Resizer",
                    "key" : "image_resizer",
                    "type" : "text",
                    "id" : "02571042911252212781"
                },
                {
                    "name" : "Middleware URL",
                    "key" : "middleware_url",
                    "type" : "text",
                    "id" : "85228814144266329197"
                },
                {
                    "name" : "Payment Gateway Url",
                    "key" : "payment_gateway_url",
                    "type" : "text",
                    "id" : "11571474125533799312"
                },
                {
                    "name" : "OVP Gateway",
                    "key" : "ovp_gateway",
                    "type" : "text",
                    "id" : "11516616425527964142"
                }
            ],
            "childId" : "11516616425527964142"
        },
        {
            "name" : "Midddleware and 3rd party Keys",
            "key" : "midddleware_and_3rd_party_keys",
            "type" : "complex",
            "sectionId" : "91015409103147740929",
            "id" : "41102602243027011510",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "no",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Facebook App Id",
                    "key" : "facebook_app_id",
                    "type" : "text",
                    "id" : "21267210821116401981"
                },
                {
                    "name" : "Google App Id",
                    "key" : "google_app_id",
                    "type" : "text",
                    "id" : "21122481912201018805"
                },
                {
                    "name" : "Partner Info",
                    "key" : "partner_info",
                    "type" : "complex",
                    "id" : "01861851189126041038"
                }
            ],
            "childId" : "01861851189126041038"
        },
        {
            "name" : "Ad config List",
            "key" : "ad_config_list",
            "type" : "complex",
            "parentId" : "01582193223242254101",
            "id" : "24521701438325554264",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Sizes",
                    "key" : "sizes",
                    "type" : "complex",
                    "id" : "02881459029914982041"
                },
                {
                    "name" : "Slot",
                    "key" : "slot",
                    "type" : "text",
                    "id" : "22297471265023374345"
                },
                {
                    "name" : "Slot id",
                    "key" : "slot_id",
                    "type" : "text",
                    "id" : "81370814826142134644"
                }
            ],
            "childId" : "81370814826142134644"
        },
        {
            "name" : "Advertise with us",
            "key" : "advertise_with_us",
            "type" : "text",
            "parentId" : "01582193223242254101",
            "id" : "02464381622042091342",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "App Version",
            "key" : "app_version",
            "type" : "complex",
            "parentId" : "01582193223242254101",
            "id" : "64512589191977513793",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "no",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Enforce",
                    "key" : "enforce",
                    "type" : "boolean",
                    "id" : "95461142722832412871"
                },
                {
                    "name" : "Store Link",
                    "key" : "store_link",
                    "type" : "text",
                    "id" : "51052742523210155190"
                },
                {
                    "name" : "Version Code",
                    "key" : "version_code",
                    "type" : "text",
                    "id" : "21671271741796414728"
                },
                {
                    "name" : "Version Name",
                    "key" : "version_name",
                    "type" : "text",
                    "id" : "55973244911121711232"
                }
            ],
            "childId" : "55973244911121711232"
        },
        {
            "name" : "AppGrid Cache Time",
            "key" : "appgrid_cache_time",
            "type" : "text",
            "parentId" : "01582193223242254101",
            "id" : "01951481671093121681",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Language filter options",
            "key" : "language_filter_options",
            "type" : "complex",
            "parentId" : "01582193223242254101",
            "id" : "45010318319200293981",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Filter Value",
                    "key" : "filter_value",
                    "type" : "text",
                    "id" : "21601441333379112851"
                },
                {
                    "name" : "Title",
                    "key" : "title",
                    "type" : "text",
                    "id" : "42413190194922511401"
                }
            ],
            "childId" : "42413190194922511401",
            "valueList" : {
                "21252752754279425798" : [
                    {
                        "id" : "21567749145253251152",
                        "name" : "Filter1"
                    },
                    {
                        "id" : "32171194012745243735",
                        "name" : "Filter2"
                    }
                ]
            }
        },
        {
            "name" : "OVP Cache Time",
            "key" : "ovp_cache_time",
            "type" : "text",
            "parentId" : "01582193223242254101",
            "id" : "57322943184712692149",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Payment Options",
            "key" : "payment_options",
            "type" : "complex",
            "parentId" : "01582193223242254101",
            "id" : "51451361031944500237",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Display Title Key",
                    "key" : "display_title_key",
                    "type" : "text",
                    "id" : "61843424527425214495"
                },
                {
                    "name" : "Payment option value",
                    "key" : "payment_option_value",
                    "type" : "text",
                    "id" : "81849610400178112030"
                },
                {
                    "name" : "Payment Restriction Value",
                    "key" : "payment_restriction_value",
                    "type" : "text",
                    "id" : "22597028164911681088"
                }
            ],
            "childId" : "22597028164911681088"
        },
        {
            "name" : "Re-Captcha Key",
            "key" : "re-captcha_key",
            "type" : "text",
            "parentId" : "01582193223242254101",
            "id" : "81051869213819225896",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Share Options",
            "key" : "share_options",
            "type" : "complex",
            "parentId" : "01582193223242254101",
            "id" : "63212883641551842702",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "91642891159153556010"
                },
                {
                    "name" : "name",
                    "key" : "name",
                    "type" : "text",
                    "id" : "12458713689816713388"
                },
                {
                    "name" : "shown",
                    "key" : "shown",
                    "type" : "boolean",
                    "id" : "42458258412711184525"
                }
            ],
            "childId" : "42458258412711184525"
        },
        {
            "name" : "SMS Sender",
            "key" : "sms_sender",
            "type" : "text",
            "parentId" : "01582193223242254101",
            "id" : "51059893260101946372",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Sorting Filter",
            "key" : "sorting_filter",
            "type" : "complex",
            "parentId" : "01582193223242254101",
            "id" : "61052227861201551324",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Filter Value",
                    "key" : "filter_value",
                    "type" : "text",
                    "id" : "01530523526202938919"
                },
                {
                    "name" : "Title",
                    "key" : "title",
                    "type" : "text",
                    "id" : "21102941758642132198"
                }
            ],
            "childId" : "21102941758642132198"
        },
        {
            "name" : "Sizes",
            "key" : "sizes",
            "type" : "complex",
            "parentId" : "24521701438325554264",
            "id" : "02881459029914982041",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Height",
                    "key" : "height",
                    "type" : "text",
                    "id" : "13129125172622371901"
                },
                {
                    "name" : "Width",
                    "key" : "width",
                    "type" : "text",
                    "id" : "52261611273987161381"
                }
            ],
            "childId" : "52261611273987161381"
        },
        {
            "name" : "Slot",
            "key" : "slot",
            "type" : "text",
            "parentId" : "24521701438325554264",
            "id" : "22297471265023374345",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Slot id",
            "key" : "slot_id",
            "type" : "text",
            "parentId" : "24521701438325554264",
            "id" : "81370814826142134644",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Height",
            "key" : "height",
            "type" : "text",
            "parentId" : "02881459029914982041",
            "id" : "13129125172622371901",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Width",
            "key" : "width",
            "type" : "text",
            "parentId" : "02881459029914982041",
            "id" : "52261611273987161381",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Enforce",
            "key" : "enforce",
            "type" : "boolean",
            "parentId" : "64512589191977513793",
            "id" : "95461142722832412871",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Store Link",
            "key" : "store_link",
            "type" : "text",
            "parentId" : "64512589191977513793",
            "id" : "51052742523210155190",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Version Code",
            "key" : "version_code",
            "type" : "text",
            "parentId" : "64512589191977513793",
            "id" : "21671271741796414728",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Version Name",
            "key" : "version_name",
            "type" : "text",
            "parentId" : "64512589191977513793",
            "id" : "55973244911121711232",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Filter Value",
            "key" : "filter_value",
            "type" : "text",
            "parentId" : "45010318319200293981",
            "id" : "21601441333379112851",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Title",
            "key" : "title",
            "type" : "text",
            "parentId" : "45010318319200293981",
            "id" : "42413190194922511401",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Display Title Key",
            "key" : "display_title_key",
            "type" : "text",
            "parentId" : "51451361031944500237",
            "id" : "61843424527425214495",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Payment option value",
            "key" : "payment_option_value",
            "type" : "text",
            "parentId" : "51451361031944500237",
            "id" : "81849610400178112030",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Payment Restriction Value",
            "key" : "payment_restriction_value",
            "type" : "text",
            "parentId" : "51451361031944500237",
            "id" : "22597028164911681088",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "id",
            "key" : "id",
            "type" : "text",
            "parentId" : "63212883641551842702",
            "id" : "91642891159153556010",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "name",
            "key" : "name",
            "type" : "text",
            "parentId" : "63212883641551842702",
            "id" : "12458713689816713388",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "shown",
            "key" : "shown",
            "type" : "boolean",
            "parentId" : "63212883641551842702",
            "id" : "42458258412711184525",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Filter Value",
            "key" : "filter_value",
            "type" : "text",
            "parentId" : "61052227861201551324",
            "id" : "01530523526202938919",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Title",
            "key" : "title",
            "type" : "text",
            "parentId" : "61052227861201551324",
            "id" : "21102941758642132198",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Details Page type",
            "key" : "details_page_type",
            "type" : "list",
            "parentId" : "32061437517311661622",
            "id" : "32731091316714216818",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                },
                {
                    "id" : "options",
                    "name" : "Options",
                    "type" : "dynamicDropdown",
                    "data" : [
                        {
                            "name" : "Episode",
                            "value" : "episode",
                            "id" : "41322292254117256223"
                        },
                        {
                            "name" : "Movie",
                            "value" : "movie",
                            "id" : "53554571575158168781"
                        },
                        {
                            "name" : "TV Show",
                            "value" : "tVShow",
                            "id" : "60324518020812660290"
                        }
                    ]
                }
            ]
        },
        {
            "name" : "ID",
            "key" : "id",
            "type" : "text",
            "parentId" : "32061437517311661622",
            "id" : "32811861542622334813",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Vmax Ads/ Google DFP ads",
            "key" : "vmax_ads/_google_dfp_ads",
            "type" : "text",
            "parentId" : "32061437517311661622",
            "id" : "44413118117873239128",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Auth Gateway",
            "key" : "auth_gateway",
            "type" : "text",
            "parentId" : "41091291859826902632",
            "id" : "02902651542869710674",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "CMS Gateway",
            "key" : "cms_gateway",
            "type" : "text",
            "parentId" : "41091291859826902632",
            "id" : "67020317252501552180",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Image Resizer",
            "key" : "image_resizer",
            "type" : "text",
            "parentId" : "41091291859826902632",
            "id" : "02571042911252212781",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Middleware URL",
            "key" : "middleware_url",
            "type" : "text",
            "parentId" : "41091291859826902632",
            "id" : "85228814144266329197",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Payment Gateway Url",
            "key" : "payment_gateway_url",
            "type" : "text",
            "parentId" : "41091291859826902632",
            "id" : "11571474125533799312",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "OVP Gateway",
            "key" : "ovp_gateway",
            "type" : "text",
            "parentId" : "41091291859826902632",
            "id" : "11516616425527964142",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Facebook App Id",
            "key" : "facebook_app_id",
            "type" : "text",
            "parentId" : "41102602243027011510",
            "id" : "21267210821116401981",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Google App Id",
            "key" : "google_app_id",
            "type" : "text",
            "parentId" : "41102602243027011510",
            "id" : "21122481912201018805",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Partner Info",
            "key" : "partner_info",
            "type" : "complex",
            "parentId" : "41102602243027011510",
            "id" : "01861851189126041038",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "no",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Evergent Partner Info",
                    "key" : "evergent_partner_info",
                    "type" : "text",
                    "id" : "21501032335981721131"
                }
            ],
            "childId" : "21501032335981721131"
        },
        {
            "name" : "Evergent Partner Info",
            "key" : "evergent_partner_info",
            "type" : "text",
            "parentId" : "01861851189126041038",
            "id" : "21501032335981721131",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Footer",
            "key" : "footer",
            "type" : "complex",
            "sectionId" : "11181511481301291689",
            "id" : "99818916019211912119",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Action",
                    "key" : "action",
                    "type" : "text",
                    "id" : "21449215181221381981"
                },
                {
                    "name" : "Id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "42420916410661115129"
                },
                {
                    "name" : "Type",
                    "key" : "type",
                    "type" : "list",
                    "id" : "81022847326311293411"
                }
            ],
            "childId" : "81022847326311293411"
        },
        {
            "name" : "Nav",
            "key" : "nav",
            "type" : "complex",
            "sectionId" : "11181511481301291689",
            "id" : "32048957124197736809",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Name",
                    "key" : "name",
                    "type" : "text",
                    "id" : "64315451141107173196"
                },
                {
                    "name" : "id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "51732991411639469328"
                },
                {
                    "name" : "Image",
                    "key" : "image",
                    "type" : "text",
                    "id" : "11514513152104124212"
                },
                {
                    "name" : "Action",
                    "key" : "action",
                    "type" : "text",
                    "id" : "27311015810421019814"
                },
                {
                    "name" : "Shown",
                    "key" : "shown",
                    "type" : "boolean",
                    "id" : "91342611221276182438"
                }
            ],
            "valueList" : {
                "83145219261033181001" : [
                    {
                        "id" : "71251374514283119108",
                        "name" : "Sports Tab"
                    },
                    {
                        "id" : "01094717125617610125",
                        "name" : "Movies Tab"
                    },
                    {
                        "id" : "32732649458445117142",
                        "name" : "Shows Tab"
                    },
                    {
                        "id" : "51431512401247138971",
                        "name" : "Signup"
                    }
                ],
                "21768813412578225025" : [
                    {
                        "id" : "71251374514283119108",
                        "name" : "Sports Tab"
                    },
                    {
                        "id" : "01094717125617610125",
                        "name" : "Movies Tab"
                    },
                    {
                        "id" : "32732649458445117142",
                        "name" : "Shows Tab"
                    },
                    {
                        "id" : "51431512401247138971",
                        "name" : "Signup"
                    }
                ],
                "88664069747441321302" : [
                    {
                        "id" : "71251374514283119108",
                        "name" : "Sports Tab"
                    },
                    {
                        "id" : "01094717125617610125",
                        "name" : "Movies Tab"
                    },
                    {
                        "id" : "32732649458445117142",
                        "name" : "Shows Tab"
                    },
                    {
                        "id" : "51431512401247138971",
                        "name" : "Signup"
                    }
                ]
            },
            "childId" : "91342611221276182438"
        },
        {
            "name" : "Action",
            "key" : "action",
            "type" : "text",
            "parentId" : "99818916019211912119",
            "id" : "21449215181221381981",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Id",
            "key" : "id",
            "type" : "text",
            "parentId" : "99818916019211912119",
            "id" : "42420916410661115129",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Type",
            "key" : "type",
            "type" : "list",
            "parentId" : "99818916019211912119",
            "id" : "81022847326311293411",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                },
                {
                    "id" : "options",
                    "name" : "Options",
                    "type" : "dynamicDropdown",
                    "data" : [
                        {
                            "name" : "Internal",
                            "value" : "internal",
                            "id" : "61052912922181323911"
                        },
                        {
                            "name" : "External",
                            "value" : "external",
                            "id" : "91064713188839121202"
                        }
                    ]
                }
            ]
        },
        {
            "name" : "Template Id",
            "key" : "template_id",
            "type" : "template",
            "parentId" : "61102801032451341521",
            "id" : "02822352321060029126",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "view",
            "key" : "view",
            "type" : "list",
            "parentId" : "61102801032451341521",
            "id" : "32451641024427213261",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                },
                {
                    "id" : "options",
                    "name" : "Options",
                    "type" : "dynamicDropdown",
                    "data" : [
                        {
                            "name" : "Featured Rail",
                            "value" : "featuredRail",
                            "id" : "42188112911435881547"
                        },
                        {
                            "name" : "Normal Rail Landscape",
                            "value" : "normalRailLandscape",
                            "id" : "71353517465174206142"
                        },
                        {
                            "name" : "Normal Rail Portrait",
                            "value" : "normalRailPortrait",
                            "id" : "71094213204169194141"
                        }
                    ]
                }
            ]
        },
        {
            "name" : "Name",
            "key" : "name",
            "type" : "text",
            "parentId" : "32048957124197736809",
            "id" : "64315451141107173196",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "id",
            "key" : "id",
            "type" : "text",
            "parentId" : "32048957124197736809",
            "id" : "51732991411639469328",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Image",
            "key" : "image",
            "type" : "text",
            "parentId" : "32048957124197736809",
            "id" : "11514513152104124212",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Action",
            "key" : "action",
            "type" : "text",
            "parentId" : "32048957124197736809",
            "id" : "27311015810421019814",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Shown",
            "key" : "shown",
            "type" : "boolean",
            "parentId" : "32048957124197736809",
            "id" : "91342611221276182438",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Forms",
            "key" : "forms",
            "type" : "complex",
            "sectionId" : "01020221218141245126",
            "id" : "54919425217518413021",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "yes",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "02139228710365261292"
                },
                {
                    "name" : "fields",
                    "key" : "fields",
                    "type" : "complex",
                    "id" : "01902922001452401275"
                },
                {
                    "name" : "Template Id",
                    "key" : "template_id",
                    "type" : "template",
                    "id" : "91921302146328216474"
                },
                {
                    "name" : "Name",
                    "key" : "name",
                    "type" : "text",
                    "id" : "91311514129429154921"
                },
                {
                    "name" : "Buttons",
                    "key" : "buttons",
                    "type" : "complex",
                    "id" : "61657226515223433215"
                }
            ],
            "childId" : "61657226515223433215",
            "valueList" : {
                "83145219261033181001" : [
                    {
                        "id" : "79924127851915241215",
                        "name" : "Sign up Form"
                    },
                    {
                        "id" : "01835511126419211700",
                        "name" : "Login Form"
                    }
                ],
                "21768813412578225025" : [
                    {
                        "id" : "79924127851915241215",
                        "name" : "Sign up Form"
                    },
                    {
                        "id" : "01835511126419211700",
                        "name" : "Login Form"
                    }
                ],
                "88664069747441321302" : [
                    {
                        "id" : "79924127851915241215",
                        "name" : "Sign up Form"
                    },
                    {
                        "id" : "01835511126419211700",
                        "name" : "Login Form"
                    }
                ]
            }
        },
        {
            "name" : "id",
            "key" : "id",
            "type" : "text",
            "parentId" : "54919425217518413021",
            "id" : "02139228710365261292",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "fields",
            "key" : "fields",
            "type" : "complex",
            "parentId" : "54919425217518413021",
            "id" : "01902922001452401275",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "yes",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "55218950213152142881"
                },
                {
                    "name" : "display Name",
                    "key" : "display_name",
                    "type" : "text",
                    "id" : "68311016012146102076"
                },
                {
                    "name" : "Type",
                    "key" : "type",
                    "type" : "list",
                    "id" : "01223121718410640101"
                },
                {
                    "name" : "Options",
                    "key" : "options",
                    "type" : "complex",
                    "id" : "31723343248102261101"
                },
                {
                    "name" : "url",
                    "key" : "url",
                    "type" : "text",
                    "id" : "95670289164422452433"
                },
                {
                    "name" : "Parent Field",
                    "key" : "parent_field",
                    "type" : "text",
                    "id" : "24599142240207232676"
                },
                {
                    "name" : "Child Field",
                    "key" : "child_field",
                    "type" : "text",
                    "id" : "51581981302255955277"
                }
            ],
            "childId" : "51581981302255955277",
            "valueList" : {
                "83145219261033181001" : [
                    {
                        "id" : "31016112177817913118",
                        "name" : "User Name",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "02743793745281095217",
                        "name" : "Password",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "71341186910220525957",
                        "name" : "Mobile Number",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "51151538314218321668",
                        "name" : "Country",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "91612271742811218198",
                        "name" : "State",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "71224526861273642221",
                        "name" : "Channel Partner ID",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "01151732551736105187",
                        "name" : "Api user",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "12819426546161651817",
                        "name" : "Api password",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "51615413300152021423",
                        "name" : "First name",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "12580420029115018914",
                        "name" : "Last name",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "37116021801647519010",
                        "name" : "dmaId",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "81701801441475912311",
                        "name" : "Email",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "32349419122212685717",
                        "name" : "Date of Birth",
                        "parentValueId" : "79924127851915241215"
                    }
                ],
                "21768813412578225025" : [
                    {
                        "id" : "31016112177817913118",
                        "name" : "User Name",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "02743793745281095217",
                        "name" : "Password",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "71341186910220525957",
                        "name" : "Mobile Number",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "51151538314218321668",
                        "name" : "Country",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "91612271742811218198",
                        "name" : "State",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "71224526861273642221",
                        "name" : "Channel Partner ID",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "01151732551736105187",
                        "name" : "Api user",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "12819426546161651817",
                        "name" : "Api password",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "51615413300152021423",
                        "name" : "First name",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "12580420029115018914",
                        "name" : "Last name",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "37116021801647519010",
                        "name" : "dmaId",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "81701801441475912311",
                        "name" : "Email",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "32349419122212685717",
                        "name" : "Date of Birth",
                        "parentValueId" : "79924127851915241215"
                    }
                ],
                "88664069747441321302" : [
                    {
                        "id" : "31016112177817913118",
                        "name" : "User Name",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "02743793745281095217",
                        "name" : "Password",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "71341186910220525957",
                        "name" : "Mobile Number",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "51151538314218321668",
                        "name" : "Country",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "91612271742811218198",
                        "name" : "State",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "71224526861273642221",
                        "name" : "Channel Partner ID",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "01151732551736105187",
                        "name" : "Api user",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "12819426546161651817",
                        "name" : "Api password",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "51615413300152021423",
                        "name" : "First name",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "12580420029115018914",
                        "name" : "Last name",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "37116021801647519010",
                        "name" : "dmaId",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "81701801441475912311",
                        "name" : "Email",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "32349419122212685717",
                        "name" : "Date of Birth",
                        "parentValueId" : "79924127851915241215"
                    }
                ]
            }
        },
        {
            "name" : "Template Id",
            "key" : "template_id",
            "type" : "template",
            "parentId" : "54919425217518413021",
            "id" : "91921302146328216474",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "id",
            "key" : "id",
            "type" : "text",
            "parentId" : "01902922001452401275",
            "id" : "55218950213152142881",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "display Name",
            "key" : "display_name",
            "type" : "text",
            "parentId" : "01902922001452401275",
            "id" : "68311016012146102076",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Type",
            "key" : "type",
            "type" : "list",
            "parentId" : "01902922001452401275",
            "id" : "01223121718410640101",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                },
                {
                    "id" : "options",
                    "name" : "Options",
                    "type" : "dynamicDropdown",
                    "data" : [
                        {
                            "name" : "Text",
                            "value" : "text",
                            "id" : "11420224411323518061"
                        },
                        {
                            "name" : "Text Area",
                            "value" : "textArea",
                            "id" : "81452071874130149181"
                        },
                        {
                            "name" : "Date",
                            "value" : "date",
                            "id" : "22202485526297112232"
                        },
                        {
                            "name" : "Dropdown",
                            "value" : "dropdown",
                            "id" : "33491061552566316154"
                        },
                        {
                            "name" : "Dynamic Dropdown",
                            "value" : "dynamicDropdown",
                            "id" : "55773291182135111277"
                        },
                        {
                            "name" : "Password",
                            "value" : "password",
                            "id" : "30011221223581916478"
                        },
                        {
                            "name" : "Email",
                            "value" : "email",
                            "id" : "11102522801331766532"
                        },
                        {
                            "name" : "Mobile number",
                            "value" : "tel",
                            "id" : "54516220254167427512"
                        }
                    ]
                }
            ]
        },
        {
            "name" : "Options",
            "key" : "options",
            "type" : "complex",
            "parentId" : "01902922001452401275",
            "id" : "31723343248102261101",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Value",
                    "key" : "value",
                    "type" : "text",
                    "id" : "12741314214361278119"
                },
                {
                    "name" : "Name",
                    "key" : "name",
                    "type" : "text",
                    "id" : "17571121912438089514"
                }
            ],
            "childId" : "17571121912438089514",
            "valueList" : {
                "83145219261033181001" : [
                    {
                        "id" : "21741512484216112116",
                        "name" : "India",
                        "parentValueId" : "51151538314218321668"
                    },
                    {
                        "id" : "97100163190199991820",
                        "name" : "Pakistan",
                        "parentValueId" : "51151538314218321668"
                    },
                    {
                        "id" : "12757414118259722125",
                        "name" : "Australia",
                        "parentValueId" : "51151538314218321668"
                    }
                ],
                "21768813412578225025" : [
                    {
                        "id" : "21741512484216112116",
                        "name" : "India",
                        "parentValueId" : "51151538314218321668"
                    },
                    {
                        "id" : "97100163190199991820",
                        "name" : "Pakistan",
                        "parentValueId" : "51151538314218321668"
                    },
                    {
                        "id" : "12757414118259722125",
                        "name" : "Australia",
                        "parentValueId" : "51151538314218321668"
                    }
                ],
                "88664069747441321302" : [
                    {
                        "id" : "21741512484216112116",
                        "name" : "India",
                        "parentValueId" : "51151538314218321668"
                    },
                    {
                        "id" : "97100163190199991820",
                        "name" : "Pakistan",
                        "parentValueId" : "51151538314218321668"
                    },
                    {
                        "id" : "12757414118259722125",
                        "name" : "Australia",
                        "parentValueId" : "51151538314218321668"
                    }
                ]
            }
        },
        {
            "name" : "url",
            "key" : "url",
            "type" : "text",
            "parentId" : "01902922001452401275",
            "id" : "95670289164422452433",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Type",
            "key" : "type",
            "type" : "list",
            "parentId" : "81051756942123360149",
            "id" : "42141002521115619219",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                },
                {
                    "id" : "options",
                    "name" : "Options",
                    "type" : "dynamicDropdown",
                    "data" : [
                        {
                            "name" : "Form",
                            "value" : "form",
                            "id" : "31011931418110081422"
                        },
                        {
                            "name" : "Bands Page",
                            "value" : "bandsPage",
                            "id" : "21629329148412522691"
                        }
                    ]
                }
            ]
        },
        {
            "name" : "Parent Field",
            "key" : "parent_field",
            "type" : "text",
            "parentId" : "01902922001452401275",
            "id" : "24599142240207232676",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Child Field",
            "key" : "child_field",
            "type" : "text",
            "parentId" : "01902922001452401275",
            "id" : "51581981302255955277",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Value",
            "key" : "value",
            "type" : "text",
            "parentId" : "31723343248102261101",
            "id" : "12741314214361278119",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Name",
            "key" : "name",
            "type" : "text",
            "parentId" : "31723343248102261101",
            "id" : "17571121912438089514",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Forms",
            "key" : "forms",
            "type" : "complex",
            "parentId" : "81051756942123360149",
            "id" : "81977317015258180179",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "51858412526528123185"
                }
            ],
            "childId" : "51858412526528123185",
            "valueList" : {
                "83145219261033181001" : [
                    {
                        "id" : "12222211001252532763",
                        "name" : "Signup",
                        "parentValueId" : "22014867941732021749"
                    }
                ],
                "21768813412578225025" : [
                    {
                        "id" : "12222211001252532763",
                        "name" : "Signup",
                        "parentValueId" : "22014867941732021749"
                    }
                ],
                "88664069747441321302" : [
                    {
                        "id" : "12222211001252532763",
                        "name" : "Signup",
                        "parentValueId" : "22014867941732021749"
                    }
                ]
            }
        },
        {
            "name" : "id",
            "key" : "id",
            "type" : "text",
            "parentId" : "81977317015258180179",
            "id" : "51858412526528123185",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Action",
            "key" : "action",
            "type" : "list",
            "parentId" : "61102801032451341521",
            "id" : "01542191351961431971",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                },
                {
                    "id" : "options",
                    "name" : "Options",
                    "type" : "dynamicDropdown",
                    "data" : [
                        {
                            "name" : "Get",
                            "value" : "get",
                            "id" : "22391322422266294292"
                        },
                        {
                            "name" : "Post",
                            "value" : "post",
                            "id" : "21183116919543165195"
                        },
                        {
                            "name" : "Put",
                            "value" : "put",
                            "id" : "99727107913125649699"
                        },
                        {
                            "name" : "Delete",
                            "value" : "delete",
                            "id" : "02702428415737100104"
                        }
                    ]
                }
            ]
        },
        {
            "name" : "Name",
            "key" : "name",
            "type" : "text",
            "parentId" : "54919425217518413021",
            "id" : "91311514129429154921",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Buttons",
            "key" : "buttons",
            "type" : "complex",
            "parentId" : "54919425217518413021",
            "id" : "61657226515223433215",
            "parameters" : [
                {
                    "id" : "repeatable",
                    "name" : "Repeatable",
                    "type" : "dropdown",
                    "value" : "",
                    "options" : [
                        {
                            "id" : "yes",
                            "name" : "YES"
                        },
                        {
                            "id" : "no",
                            "name" : "NO"
                        }
                    ]
                }
            ],
            "attributes" : [
                {
                    "name" : "Name",
                    "key" : "name",
                    "type" : "text",
                    "id" : "23905806710112602134"
                },
                {
                    "name" : "id",
                    "key" : "id",
                    "type" : "text",
                    "id" : "21781301680686243923"
                },
                {
                    "name" : "Action",
                    "key" : "action",
                    "type" : "list",
                    "id" : "12840915310110226416"
                }
            ],
            "childId" : "12840915310110226416",
            "valueList" : {
                "83145219261033181001" : [
                    {
                        "id" : "81631781421281631281",
                        "name" : "Signup",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "01442842261621291651",
                        "name" : "Reset",
                        "parentValueId" : "79924127851915241215"
                    }
                ],
                "21768813412578225025" : [
                    {
                        "id" : "81631781421281631281",
                        "name" : "Signup",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "01442842261621291651",
                        "name" : "Reset",
                        "parentValueId" : "79924127851915241215"
                    }
                ],
                "88664069747441321302" : [
                    {
                        "id" : "81631781421281631281",
                        "name" : "Signup",
                        "parentValueId" : "79924127851915241215"
                    },
                    {
                        "id" : "01442842261621291651",
                        "name" : "Reset",
                        "parentValueId" : "79924127851915241215"
                    }
                ]
            }
        },
        {
            "name" : "Name",
            "key" : "name",
            "type" : "text",
            "parentId" : "61657226515223433215",
            "id" : "23905806710112602134",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "id",
            "key" : "id",
            "type" : "text",
            "parentId" : "61657226515223433215",
            "id" : "21781301680686243923",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                }
            ]
        },
        {
            "name" : "Action",
            "key" : "action",
            "type" : "list",
            "parentId" : "61657226515223433215",
            "id" : "12840915310110226416",
            "parameters" : [
                {
                    "id" : "defaultValue",
                    "name" : "Default Value",
                    "type" : "text",
                    "data" : ""
                },
                {
                    "id" : "options",
                    "name" : "Options",
                    "type" : "dynamicDropdown",
                    "data" : [
                        {
                            "name" : "Form Action",
                            "value" : "submit",
                            "id" : "15269944811223939271"
                        },
                        {
                            "name" : "Reset Action",
                            "value" : "reset",
                            "id" : "78841885914370100211"
                        }
                    ]
                }
            ]
        }
    ],
    "globalConfiguration" : {
        "profileId" : "21252752754279425798"
    }
};

var x = {

}