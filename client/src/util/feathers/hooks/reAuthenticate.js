/**
 * HACK TO FIX SERVICES THAT REQUIRE AUTHENTICATION AFTER BROWSER REFRESH
 * authenticate methods (create, update, patch, remove) for services array (THREADS and COMMENTS)
 * @param {Object} app
 * @param {Array} requiresAuthServices
 */

export default function reAuthenticate(app, requiresAuthServices) {
  app.hooks({
    before: {
      all: async hook => {
        
        const requiresAuthMethods = ['create', 'update', 'patch', 'remove'];

        if (requiresAuthServices.includes(hook.path) && requiresAuthMethods.includes(hook.method)) {
          // console.log('Requires Auth for service: ', hook.path);
          // console.log('Method requires auth! ', hook.method);
          await app.authenticate();
          return hook;
        }

        return hook;
      }
    }
  });
}