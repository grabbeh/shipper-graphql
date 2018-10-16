import React from 'react'
import Grid from '../layout/Grid'

const style = {
  container: {
    color: '#333'
  },

  todayContainer: {
    width: 'auto',
    margin: '0 auto'
  },

  todayBody: {
    marginLeft: '20px'
  },

  todayName: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0
  },

  todayTemp: {
    fontSize: '14px',
    margin: 0,
    color: '#8a8a8a',
    lineHeight: '1.5'
  },

  title: {
    fontSize: '16px',
    margin: '20px 0 10px 0',
    textAlign: 'center'
  },

  forecastContainer: {
    margin: '0 auto',
    width: 'auto'
  },

  weatherContainer: {
    marginBottom: '10px',
    width: 'auto'
  },

  weatherIcon: {
    width: '32px',
    height: '32px',
    marginRight: '20px'
  },

  weatherBody: {
    maxWidth: '280px'
  },

  weatherDate: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: 0
  },

  weatherName: {
    fontSize: '18px',
    margin: '3px 0 2px 0'
  },

  weatherTemp: {
    fontSize: '12px',
    color: '#8a8a8a',
    lineHeight: '1.5',
    margin: 0
  }
}

function Content (props) {
  let { data: { content } } = props

  return (
    <Grid style={style.container}>
      <h2 style={style.title}>Content</h2>
      <Grid.Cell>
        <Grid style={style.forecastContainer}>
          {content.map((article, i) => (
            <Grid style={style.weatherContainer} key={i}>
              <Grid.Row>
                <Grid style={style.weatherBody}>
                  <Grid>
                    <Grid.Row>{article.title}</Grid.Row>&gt;
                  </Grid>
                </Grid>
              </Grid.Row>
            </Grid>
          ))}
        </Grid>
      </Grid.Cell>
    </Grid>
  )
}

export default Content
