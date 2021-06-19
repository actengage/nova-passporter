import SecretToken from './components/SecretToken';
import Tool from './components/Tool';

function shouldShowSecretToken(response) {
  const { config, data } = response;
  
  return !!(
    config.url === '\/nova-api\/passport-clients'
      && data
      && data.resource
      && data.resource.secret
  );
}

function createModal(Vue, resource) {
  const SecretTokenComponent = Vue.extend(SecretToken);

  const el = document.createElement('div');

  document.body.append(el);

  const component = new SecretTokenComponent({
    propsData: {
      resource
    }
  }).$mount(el);

  component.$on('close', () => {
    component.$destroy();
    component.$el.parentNode.removeChild(component.$el);
  });

  component.$on('copy', () => {
    Nova.success('Secret copied to clipboard!');
  });

  return component;
}

Nova.booting((Vue, router, store) => {
  router.addRoutes([{
    name: 'passporter',
    path: '/passporter',
    component: Tool
  }]);
  
  Nova.request().interceptors.response.use(response => {
    // This feature will show the plain secret token if it exists.
    if(shouldShowSecretToken(response)) {
      createModal(Vue, response.data.resource);
    }

    return response;
  });
});
