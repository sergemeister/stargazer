import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import DetailsPage from '../component'

const mockStore = configureStore([])

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useParams: () => ({
    id: "10270250",
  })
}))
 
describe('DetailsPage', () => {
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
            languages_url: "https://api.github.com/repos/facebook/react/languages",
            languages: {
              JavaScript: "94.9%",
              HTML: "2.2%",
              CSS: "1.2%",
              "C++": "0.8%",
              TypeScript: "0.4%",
              CoffeeScript: "0.3%",
              C: "0.1%",
              Shell: "0.1%"
            }
          }
        }
      },
    })

    store.dispatch = jest.fn()
  })

  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <DetailsPage />
      </Provider>
    )
    expect(component).toMatchSnapshot()
    component.unmount()
  })
});
