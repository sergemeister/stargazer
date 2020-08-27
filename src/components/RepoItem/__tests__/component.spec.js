import React from 'react'
import { useDispatch } from 'react-redux'
import { mount, shallow } from 'enzyme'
import RepoItem from '../component'
import { removeRepository } from '../../../actions'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  })
}))

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}))
 
describe('RepoItem', () => {
  let component;
  const repository = {
    id: 123,
    full_name: "facebook/react",
    stargazers_count: 12345,
    subscribers_count: 6678,
    forks_count: 30270,
    clone_url: "https://github.com/facebook/react.git",
    languages_url: "https://api.github.com/repos/facebook/react/languages"
  }
  
  it('should render correctly', () => {
    component = shallow(
      <RepoItem {...repository} />
    )
    expect(component).toMatchSnapshot()
  });
 
  it('should dispatch an action on button click', () => {
    const dispatch = jest.fn()
    useDispatch.mockImplementation(() => dispatch)

    component = mount(
      <table>
        <tbody>
          <RepoItem {...repository} />
        </tbody>
      </table>
    )
    component.find('button.close').simulate('click')
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(removeRepository(123))
  });

  afterEach(() => {
    component.unmount()
  })
});
