import { handleBackgroundOptionFor } from '../../../../static/js/customizer/sync/variables/background'
import ctEvents from 'ct-events'
import { updateAndSaveEl } from '../../../../static/js/frontend/header/render-loop'
import { responsiveClassesFor } from '../../../../static/js/customizer/sync/helpers'

import {
	getRootSelectorFor,
	assembleSelector,
	mutateSelector,
} from '../../../../static/js/customizer/sync/helpers'

ctEvents.on(
	'ct:header:sync:collect-variable-descriptors',
	(variableDescriptors) => {
		variableDescriptors['search'] = ({ itemId }) => ({
			searchHeaderIconSize: {
				selector: assembleSelector(getRootSelectorFor({ itemId })),
				variable: 'icon-size',
				responsive: true,
				unit: 'px',
			},

			searchHeaderLinkColor: [
				{
					selector: assembleSelector(
						`${getRootSelectorFor({ itemId })[0]} #search-modal`
					),
					variable: 'linkInitialColor',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(
						`${getRootSelectorFor({ itemId })[0]} #search-modal`
					),
					variable: 'linkHoverColor',
					type: 'color:hover',
					responsive: true,
				},
			],

			search_close_button_color: [
				{
					selector: assembleSelector(
						`${
							getRootSelectorFor({ itemId })[0]
						} #search-modal .close-button`
					),
					variable: 'closeButtonColor',
					type: 'color:default',
				},

				{
					selector: assembleSelector(
						`${
							getRootSelectorFor({ itemId })[0]
						} #search-modal .close-button`
					),
					variable: 'closeButtonHoverColor',
					type: 'color:hover',
				},
			],

			search_close_button_shape_color: [
				{
					selector: assembleSelector(
						`${
							getRootSelectorFor({ itemId })[0]
						} #search-modal .close-button`
					),
					variable: 'closeButtonBackground',
					type: 'color:default',
				},

				{
					selector: assembleSelector(
						`${
							getRootSelectorFor({ itemId })[0]
						} #search-modal .close-button`
					),
					variable: 'closeButtonHoverBackground',
					type: 'color:hover',
				},
			],

			...handleBackgroundOptionFor({
				id: 'searchHeaderBackground',

				selector: assembleSelector(
					`${getRootSelectorFor({ itemId })[0]} #search-modal`
				),
			}),

			headerSearchMargin: {
				selector: assembleSelector(getRootSelectorFor({ itemId })),
				type: 'spacing',
				variable: 'margin',
				responsive: true,
				important: true,
			},

			// default state
			searchHeaderIconColor: [
				{
					selector: assembleSelector(getRootSelectorFor({ itemId })),
					variable: 'icon-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(getRootSelectorFor({ itemId })),
					variable: 'icon-hover-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			// transparent state
			transparentSearchHeaderIconColor: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),

					variable: 'icon-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-transparent-row="yes"]',
						})
					),

					variable: 'icon-hover-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			// sticky state
			stickySearchHeaderIconColor: [
				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-sticky*="yes"]',
						})
					),
					variable: 'icon-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: assembleSelector(
						mutateSelector({
							selector: getRootSelectorFor({ itemId }),
							operation: 'between',
							to_add: '[data-sticky*="yes"]',
						})
					),
					variable: 'icon-hover-color',
					type: 'color:hover',
					responsive: true,
				},
			],
		})
	}
)

ctEvents.on('ct:header:sync:item:search', ({ optionId, optionValue }) => {
	const selector = '[data-id="search"]'

	if (optionId === 'header_search_visibility') {
		updateAndSaveEl(selector, (el) =>
			responsiveClassesFor({ ...optionValue, desktop: true }, el)
		)
	}

	if (optionId === 'header_search_placeholder') {
		document.querySelector(
			'#search-modal [type="search"]'
		).placeholder = optionValue
	}

	if (optionId === 'searchHeaderImages') {
		let searchModal = document.querySelector(
			'#search-modal [data-live-results]'
		)

		searchModal.dataset.liveResults = optionValue === 'yes' ? 'thumbs' : ''
	}
})
