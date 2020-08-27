import React from 'react'
import { shallow } from 'enzyme'
import ReposList from '../component'
import { repositoriesData } from '../../../redux/selectors'


jest.mock('../../../redux/selectors', () => ({
  repositoriesData: jest.fn()
}))

jest.mock('react-redux', () => ({
  useSelector: jest.fn(fn => fn()),
}))
 
describe('RepoList', () => {
  let component;
 
  beforeEach(() => {
    repositoriesData.mockReturnValue([
      {
        id: 10270250,
        full_name: "facebook/react",
        stargazers_count: 154386,
        subscribers_count: 6678,
        forks_count: 30270,
        clone_url: "https://github.com/facebook/react.git",
        languages_url: "https://api.github.com/repos/facebook/react/languages"
      },
      {
        id: 11730342,
        full_name: "vuejs/vue",
        stargazers_count: 170383,
        subscribers_count: 6263,
        forks_count: 26098,
        clone_url: "https://github.com/vuejs/vue.git",
        languages_url: "https://api.github.com/repos/vuejs/vue/languages"
      }
    ])
  })
 
  it('should render correctly', () => {
    component = shallow(
      <ReposList />
    )
    expect(component).toMatchSnapshot()
  });

  afterEach(() => {
    component.unmount()
  })
});
