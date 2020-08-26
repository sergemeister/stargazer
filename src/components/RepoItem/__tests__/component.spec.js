import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount, shallow } from 'enzyme'
import RepoItem from '../component'
import { removeRepository } from '../../../actions'

const mockStore = configureStore([])

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  })
}))
 
describe('RepoItem', () => {
  let store;
 
  beforeEach(() => {
    store = mockStore({
      repositories: {
        data: {
          "123": {
            id: 123,
            full_name: "facebook/react",
            stargazers_count: 12345,
            subscribers_count: 6678,
            forks_count: 30270,
            clone_url: "https://github.com/facebook/react.git",
            languages_url: "https://api.github.com/repos/facebook/react/languages"
          }
        }
      },
    })

    store.dispatch = jest.fn()
  })
 
  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <table>
          <tbody>
            <RepoItem id={123} name="facebook/react" starsCount={12345}/>
          </tbody>
        </table>
      </Provider>
    )
    expect(component).toMatchSnapshot()
    component.unmount()
  });
 
  it('should dispatch an action on button click', () => {
    const component = mount(
      <Provider store={store}>
        <table>
          <tbody>
            <RepoItem id={123} name="facebook/react" starsCount={12345}/>
          </tbody>
        </table>
      </Provider>
    )
    component.find('button.close').simulate('click')
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(removeRepository(123))
    component.unmount()
  });
});
