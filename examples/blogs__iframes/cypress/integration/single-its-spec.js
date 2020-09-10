/// <reference types="cypress" />
import { skipOn } from '@cypress/skip-test'

const getIframeBody = () => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return cy
  .get('iframe[data-cy="the-frame"]')
  .its('0.contentDocument.body').should('not.be.empty')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  // https://on.cypress.io/wrap
  .then(cy.wrap)
}

describe('Recipe: blogs__iframes', () => {
  skipOn('firefox', () => {
    // using test retries to get occasional (rare) flake
    // https://github.com/cypress-io/cypress-example-recipes/issues/558
    it('gets the post using single its', { retries: { runMode: 2 } }, () => {
      cy.visit('index.html')
      getIframeBody().find('#run-button').should('have.text', 'Try it').click()
      getIframeBody().find('#result').should('include.text', '"delectus aut autem"')
    })
  })
})
