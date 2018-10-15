import React from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'blockstack-ui'

import { Page } from '@components/page'
import Head from '@containers/head'
import { Section, Content, Hr } from '@components/mining-admin/month'
import { Type } from 'blockstack-ui'
import { Table, Th, SpacedTd, Td, Thead, SubReward } from '@components/mining-admin/table'
import { AppLink, Name, Description, Container } from '@components/mining/registered-apps/styled'
import { AppIcon } from '@components/app-icon'
import { Button } from '@components/mining-admin/collapsable'
import Reviewer from '@components/mining/reviewer'

class MonthResults extends React.Component {
  static getInitialProps(context) {
    const { month, year } = context.query

    return {
      month,
      year
    }
  }

  title() {
    return `App Mining Results for ${this.props.report.humanReadableDate}`
  }

  rankings() {
    const { report } = this.props
    return report.compositeRankings.map((app, index) => (
      <tr>
        <SpacedTd display={['none', 'table-cell']}>{index + 1}</SpacedTd>
        <Td>
          <AppLink style={{borderTop: 'none'}}>
            <AppIcon src={app.imgixImageUrl} size={48} alt={app.name} />
            <Container>
              <Name>{app.name}</Name>
              <Description>{app.description}</Description>
            </Container>
          </AppLink>
        </Td>
        <SpacedTd>
          {app.payout && (
            <>
              {app.formattedUsdRewards}
              <SubReward>
                ({app.payout.BTCPaymentValue / 10e7} BTC)
              </SubReward>
            </>
          )}
        </SpacedTd>
      </tr>
    ))
  }

  reviewers() {
    const { report } = this.props
    return report.MiningReviewerReports.map((reviewer, index) => (
      <Reviewer reviewer={reviewer} index={index} />
    ))
  }

  render() {
    const { report } = this.props
    return (
      <Page>
        <Head title={this.title()} />
        <Flex width={1} px={[1, 5]} mb={5} flexDirection={['column', 'column', 'column', 'row']} justifyContent="space-between" flexWrap="wrap">
          <Box width={[ 1, 1, 1, 2/3 ]}>
            <Section>
              <h2>{this.title()}</h2>
            </Section>
            <Table>
              <Thead>
                <tr>
                  <Th display={['none', 'table-cell']}>Rank</Th>
                  <Th>App</Th>
                  <Th>Monthly Rewards</Th>
                  {/* <Th>Total rewards to date</Th> */}
                </tr>
              </Thead>
              <tbody>
                {this.rankings()}
              </tbody>
            </Table>
          </Box>
          <Box width={[1, 1, 1, 1/3]} pl={[0, 0, 0, 3]} pt={[3, 3, 3, 0]}>
            <Section>
              <Content>
                <Type.p>
                  <Type.strong fontWeight="700">{report.compositeRankings.length} Blockstack apps</Type.strong>{' '}
                  earned
                  {' '}<Type.strong fontWeight="700">{report.formattedTotalRewardsUsd}</Type.strong>{' '}
                  in App Mining rewards for the month of {report.humanReadableDate}.
                </Type.p>
                <Type.p>
                  These decentralized apps have guaranteed users control over their identity by implementing
                  {' '}<a href="https://blockstack.org">Blockstack authentication</a>.
                </Type.p>
                <Type.p mb={4}>
                  Are you a Blockstack app developer? Start earning rewards as soon as next month:
                </Type.p>
                <Button href="/mining" style={{width: '100%', margin: 0}}>Register your app</Button>
                <Type.p mt={4} color="#1421446e" fontSize="0.9em">
                  Note: USD values displayed for payouts made in BTC were determined based on the exchange rate at the time of conversion on {report.friendlyPurchasedAt}.
                </Type.p>
                {this.reviewers()}
                {/* <Type.p fontWeight="700">Ranking algorithm notes</Type.p> */}
              </Content>
            </Section>
          </Box>
        </Flex>
      </Page>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let foundReport
  const { month, year } = ownProps
  state.mining.appMiningMonths.forEach((report) => {
    const sameMonth = report.monthName.toLowerCase() === month.toLowerCase()
    if (sameMonth && (report.year === parseInt(year, 10))) {
      foundReport = report
    }
  })
  return {
    report: foundReport
  }
}

export default connect(mapStateToProps)(MonthResults)
