import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import AddRepoForm from '../component'
import { getRepository } from '../../../actions'

const mockStore = configureStore([])
 
describe('AddRepoForm', () => {
  let store;
 
  beforeEach(() => {
    store = mockStore({
      repositories: {
        data: {},
        error: "Repository not found"
      }
    })

    store.dispatch = jest.fn()
  })
 
  it('should render correctly', () => {
    const component = mount(
      <Provider store={store}>
        <AddRepoForm />
      </Provider>
    )
    expect(component).toMatchSnapshot()
    component.unmount()
  });

  it('should dispatch an action on button click', () => {
    const component = mount(
      <Provider store={store}>
        <AddRepoForm />
      </Provider>
    )
    component.find('input').simulate('change', { target: { value: 'facebook/react' } })
    component.find('form.add-repo-form').simulate('submit')
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(store.dispatch).toHaveBeenCalledWith(getRepository('facebook/react'))
    component.unmount()
  });
});
