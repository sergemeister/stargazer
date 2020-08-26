import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import ReposList from '../component'

const mockStore = configureStore([])
 
describe('RepoList', () => {
  let store;
 
  beforeEach(() => {
    store = mockStore({
      repositories: {
        data: {
          "10270250": {
            id: 10270250,
            full_name: "facebook/react",
            stargazers_count: 154386,
            subscribers_count: 6678,
            forks_count: 30270,
            clone_url: "https://github.com/facebook/react.git",
            languages_url: "https://api.github.com/repos/facebook/react/languages"
          },
          "11730342": {
            id: 11730342,
            full_name: "vuejs/vue",
            stargazers_count: 170383,
            subscribers_count: 6263,
            forks_count: 26098,
            clone_url: "https://github.com/vuejs/vue.git",
            languages_url: "https://api.github.com/repos/vuejs/vue/languages"
          }
        }
      },
    })

    store.dispatch = jest.fn()
  })
 
  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <ReposList />
      </Provider>
    )
    expect(component).toMatchSnapshot()
    component.unmount()
  });
});
