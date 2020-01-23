/*! 
 * Web Site Advantage: Converts data-vocabulary.org/Breadcrumb to schema.org [v1.0]
 * https://websiteadvantage.com.au/
 * Copyright (C) 2020 Web Site Advantage (MIT License)
 */
var webSiteAdvantage = webSiteAdvantage || {};

webSiteAdvantage.dataVocabularyBreadcrumbsPatch = function () {
    // find all data-vocabulary.org breadcrumbs
    var breadcrumbs = document.querySelectorAll("[itemtype='http://data-vocabulary.org/Breadcrumb']");

    for (var b = 0; b < breadcrumbs.length; b++) {
        var breadcrumb = breadcrumbs[b];

        // assume parent element of the first breadcrumb wraps all breadcrumbs. If not, need to change this
        if (b === 0) {
            // add wrapper data to indicate it's a schema.org breadcrumb list
            breadcrumb.parentElement.setAttribute('itemprop', 'breadcrumb');
            breadcrumb.parentElement.setAttribute('itemscope', '');
            breadcrumb.parentElement.setAttribute('itemtype', 'http://schema.org/BreadcrumbList');
            // could add an id to make sure al breadcrumbs get added to the same list
        }

        // change itemtype and itemprop to the schema.org ones
        breadcrumb.setAttribute('itemtype', 'http://schema.org/ListItem');
        breadcrumb.setAttribute('itemprop', 'itemListElement');

        // change itemprop url to item
        var itemElements = breadcrumb.querySelectorAll("[itemprop='url']");
        for (var i = 0; i < itemElements.length; i++) {
            itemElements[i].setAttribute('itemprop', 'item');
        }

        // change itemprop title to name
        var nameElements = breadcrumb.querySelectorAll("[itemprop='title']");
        for (var n = 0; n < nameElements.length; n++) {
            nameElements[n].setAttribute('itemprop', 'name');
        }

        // add the position meta tag
        var positionElement = document.createElement('meta');
        positionElement.setAttribute('itemprop', 'position');
        positionElement.setAttribute('content', b + 1); // start at one
        breadcrumb.appendChild(positionElement);
    }
};

webSiteAdvantage.dataVocabularyBreadcrumbsPatch();