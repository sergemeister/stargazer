import React from 'react'
import { useDispatch } from 'react-redux'
import { shallow, mount } from 'enzyme'
import AddRepoForm from '../component'
import { getRepository } from '../../../actions'
import { repositoryError } from '../../../redux/selectors'

jest.mock('../../../redux/selectors', () => ({
  repositoryError: jest.fn()
}))

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))

describe('AddRepoForm', () => {
  let component;
 
  it('should render correctly', () => {
    repositoryError.mockReturnValue('Repository not found')

    component = shallow(
      <AddRepoForm />
    )
    expect(component).toMatchSnapshot()
  });

  it('should dispatch an action on button click', () => {
    const dispatch = jest.fn()
    useDispatch.mockImplementation(() => dispatch) 

    component = mount(
      <AddRepoForm />
    )
    component.find('input').simulate('change', { target: { value: 'facebook/react' } })
    component.find('form.add-repo-form').simulate('submit')
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(getRepository('facebook/react'))
  })

  it('should show an error', () => {
    const dispatch = jest.fn()
    useDispatch.mockImplementation(() => dispatch)

    component = mount(
      <AddRepoForm />
    )
    component.find('input').simulate('change', { target: { value: 'ffdsf/rfdfde' } })
    component.find('form.add-repo-form').simulate('submit')
    repositoryError.mockReturnValue('Repository not found')
    expect(component.find('.text-danger').text()).toEqual('Repository not found')
  })

  afterEach(() => {
    component.unmount()
  })
});
