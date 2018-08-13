import styled, { css } from 'styled-components'
import { Box, boxProps } from '@components/box'
import { space } from 'styled-system'
import { theme, above, wrapperStyle } from '@common/styles'
import { animated } from 'react-spring'

const Item = styled(animated.div)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border};
  flex-grow: 1;
  position: relative;
  text-decoration: none;
  border-left: 1px solid ${theme.colors.border};
  @media (max-width: 639px) {
    border-left: 0;
  }
  ${({ link, selected }) =>
    link &&
    css`
      & > a {
        display: flex;
        align-items: center;
        max-width: 85%;
        text-decoration: none !important;
      }
      &::before {
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        content: '';
        background: ${theme.colors.blue.accent};
        position: absolute;
        transform: scaleX(0);
        transform-origin: bottom left;
        transition: all 135ms cubic-bezier(0.4, 0, 0.2, 1);
      }
      &:hover {
        * {
        }
        position: relative;

        &::before {
          transform: none;
        }
        cursor: pointer;
      }
      ${selected &&
        css`
          position: relative;
          &::before {
            transform: none;
          }
        `};
    `};
  ${({ noBorder }) =>
    noBorder &&
    css`
      border: 0 !important;
    `};

  ${boxProps};
`

const ItemLink = Item.extend`
  &:hover {
    color: ${theme.colors.blue};
  }
`

const Body = styled(Box)`
  background: white;
  display: flex;
  flex-wrap: wrap;
  border-right: 1px solid ${theme.colors.border};
  flex-grow: 1;
`

const headerBgColorGenerator = ({ title }) => {
  if (!title) return null
  if (title.includes('lockstack')) {
    return css`
      background-image: linear-gradient(-135deg, #43cbff 10%, #9708cc 180%);
    `
  }
  if (title.includes('Hot')) {
    return css`
      background-image: linear-gradient(135deg, #ffc600 -200%, #fd6e6a 200%);
    `
  }
  switch (title) {
    case 'Business Tools':
      return css`
        background-image: linear-gradient(-135deg, #fd6585 10%, #0d25b9 200%);
      `
    case 'Decentralized Exchanges':
      return css`
        background-image: linear-gradient(135deg, #3b2667 10%, #bc78ec 200%);
      `
    case 'Ethereum Wallets':
      return css`
        background-image: linear-gradient(-135deg, #92ffc0 10%, #002661 200%);
      `
    default:
      return css`
        background-image: linear-gradient(-135deg, #e2b0ff 10%, #9f44d3 180%);
      `
  }
}

const Header = styled(Box)`
  ${headerBgColorGenerator};
  ${({ white }) =>
    white &&
    css`
      background: white;
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: ${theme.colors.blue};
      }
    `};
  //background: linear-gradient(45deg, #9b51e0 0%, #5306b4 200%);
  //background: linear-gradient(45deg, #0CCABA 0%, #0C9AA6 200%);
  //background: linear-gradient(-45deg, #142144 0%, #324476 200%);
  //background: linear-gradient(45deg, #FE4F74 0%, #CF2B4D 120%);
  //background: linear-gradient(45deg, #FCB33F 0%, #E38920 200%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: white;
    text-shadow: rgba(0, 0, 0, 0.15) 1px 1px;
  }
`

const StyledListTableHeader = styled(Box)`
  border: 1px solid ${theme.colors.border};
  border-top: 0;
  border-right: 0;
  width: 100%;
  font-size: 13px;
  overflow: hidden;
  @media (max-width: 40em) {
    display: none;
  }
`

const StyledList = styled(Box)`
  box-shadow: 0 1px 1px 0 rgba(20, 33, 68, 0.04), 0 1px 3px 1px rgba(20, 33, 68, 0.09);
  display: flex;
  flex-direction: column;
  * {
    text-decoration: none;
  }
  border-radius: 6px;
  overflow: hidden;

  ${above.md`
    ${wrapperStyle};
    padding: 0;
  `};
  ${space};

  ${({ gutter }) =>
    gutter &&
    css`
      @media (min-width: 832px) {
        margin-left: 16px;
      }
    `};
`

const Image = styled.img`
  max-height: 24px;
  max-width: 24px;
  position: relative;
  top: 6px;
  margin-right: 10px;
  opacity: 0.8;
`

const TableItem = styled(Box)`
  text-align: left;
  overflow: hidden;
`

Item.defaultProps = {
  px: [2, 3],
  py: 3
}

StyledList.Header = Header
StyledList.Body = Body
StyledList.Body.Header = StyledListTableHeader
StyledList.Item = Item
StyledList.Image = Image
StyledList.ItemLink = ItemLink
StyledList.TableItem = TableItem

export { StyledList }
