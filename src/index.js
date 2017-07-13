import React from 'react'
require('./styles.sass')

const translations = {
  "de": {
    "donate_now_button": "Mehr erfahren & spenden",
    "location": "Ein Projekt in",
    "values_donor_count": "Spender",
    "values_open_amount_in_cents": "fehlen noch",
    "values_progress_percentage": "finanziert"
  },
  "en": {
    "donate_now_button": "Learn more and donate",
    "location": "A project in",
    "values_donor_count": "donors",
    "values_open_amount_in_cents": "still needed",
    "values_progress_percentage": "financed"
  }
}[document.documentElement.lang || 'de']

class Project extends React.Component {
  get location() {
    const city    = this.props.project.city
    const country = this.props.project.country
    return (city && country) ? `${city}, ${country}` : (city || country || '')
  }

  get openAmount() {
    return new Intl.NumberFormat({
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(this.props.project.open_amount_in_cents/100)
  }

  tracking = (event) => {
    if (this.props.tracking) {
      ga('send', 'event', this.props.trackingName, 'target-page', this.props.project.id)
      ga('send', 'event', this.props.trackingName, 'source-page', this.props.trackingId)
    }
  }

  get projectImageUrl() {
    let link = this.props.project.profile_picture.links.find(link => link.rel == 'fill_410x214')
    return link && link.href
  }

  get orgaImageUrl() {
    let link = this.props.project.carrier.picture.links.find(link => link.rel == 'fill_100x100')
    return link && link.href
  }

  render() {
    const project         = this.props.project,
          projectUrl      = undefined,
          scope           = {scope: 'projects.teaser_large'}

    return (
      <a className="project-teaser"
         title={ project.title }
         href={ projectUrl }
         onClick={ this.tracking } >
         <div className="image" style={{backgroundImage: `url('${this.projectImageUrl}')`}}></div>
         <h2 dangerouslySetInnerHTML={ { __html: project.title } }/>
         <div className="logo" style={{backgroundImage: `url('${this.orgaImageUrl}')`}}></div>
         <div className="location">{ this.location }</div>

         <div className='project-teaser-values'>
           <div className='project-teaser-value'>
             <div>{ project.donor_count }</div> { translations['values_donor_count'] }
           </div>
           <div className='project-teaser-value'>
             <div>{ project.progress_percentage } %</div> { translations['values_progress_percentage'] }
           </div>
           <div className='project-teaser-value'>
             <div>{ this.openAmount }</div> { translations['values_open_amount_in_cents'] }
           </div>
         </div>

         <div className="project-teaser-progress">
           <div className="bar" style={{width: project.progress_percentage + '%'}}>
           </div>
         </div>
      </a>
    )
  }
}

export default Project
