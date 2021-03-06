const express = require('express')
var router = express.Router({ strict: true })

module.exports = function (app) {
  // router.get('/', app.tools.homePage)
  router.get('/', app.controllers['notes'].gets, app.controllers['notes'].showBlog)
  router.get('/:slug/', app.controllers['notes'].getBlogBySlug)
  router.get('/:domainName/', app.controllers['notes'].getNotesByDomainName)
  router.get('/:domainId/articles/', app.controllers['notes'].getNotesInDomain)
  router.get('/:domainId/articles/:id/', app.controllers['notes'].getAsBlog)
  router.get('/:id/actions/edit', app.tools.checkAuthentication, app.controllers['notes'].editNoteForm)
  return router
}
