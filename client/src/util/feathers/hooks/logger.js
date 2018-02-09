/** 
 * FEATHERS GLOBAL HOOK LOGGER
*/
export default function logger(app) {
  app.hooks({
    after: {
      all: hook => {
        let color = (['get', 'find'].indexOf(hook.method) === -1) ? 'blue' : 'green';
        console.log(`%c${hook.method} %c[${hook.path}]`, `font-weight:bold; font-size: 18px;`, `color: ${color}; font-size: 16px;`, hook);
      }
    },
    error: {
      all: hook => {
        console.log(`%c${hook.method} %c[${hook.path}]`, 'font-weight:bold; font-size: 18px;', 'color: red; font-weight:bold; font-size: 18px;', hook);
      }
    },
  });
}