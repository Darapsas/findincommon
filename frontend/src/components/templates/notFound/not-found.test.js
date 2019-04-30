import React from 'react'
import { shallow, mount } from 'enzyme'
import NotFound from './not-found'
import { MemoryRouter, Link } from 'react-router-dom'
import renderer from 'react-test-renderer'

describe('<NotFound />', () => {
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('button exists', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/not-found']}>
        <NotFound />
      </MemoryRouter>
    )
    const linkButton = wrapper.find('button')
    expect(linkButton).toBeDefined()
  })
})
