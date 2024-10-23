
import { Flex, FlexItem, Space } from '@looker/components'
import React from 'react'
const Header = () => {
  return (
    <>
      <Flex
        justifyContent="space-between"
        style={{
          backgroundColor: '#4b8468ff',
          color: 'white',
        }}
      >
        <FlexItem>
          <img
            src={
              'https://static.wixstatic.com/media/bd5ec7_50731cf334cd4c1ea9ddabdf6338ee57~mv2.png/v1/fill/w_312,h_98,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo%20white.png'
            }
            width="220"
            height="65"
            alt="Squareshift logo"
          />
        </FlexItem>{' '}
        <FlexItem>
          <h2>Pixel Perfect</h2>
        </FlexItem>
        {/* <FlexItem>
          <h2 style={{ color: '#4b8468ff' }}> Pixel Perfect</h2>
        </FlexItem> */}
      </Flex>
    </>
  )
}

export default Header
