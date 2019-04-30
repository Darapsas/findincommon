import React from 'react'
import Header from './header'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter, Link } from 'react-router-dom'

describe('<Header />', () => {
  it('matches the snapshot', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('check something', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const linkButton = wrapper.find('button')
    expect(linkButton).toBeDefined()
  })
})
