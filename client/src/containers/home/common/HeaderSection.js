import React from 'react'
import { withRouter } from 'react-router-dom'
import UserFormCreate from 'components/Forms/user/create'
import Services from 'services'
const { User } = Services

const clientItems = [
  { label: 'React' },
  { label: 'Styled Components' },
  { label: 'Hooks/ReactN' },
  { label: 'Bootstrap/Tachyons' },
  { label: 'SocketIO' }
]

const serverItems = [
  { label: 'Node JS' },
  { label: 'Express' },
  { label: 'Feathers JS' },
  { label: 'Objection/Knex JS' },
  { label: 'MySQL/Sqlite' }
]

const listItems = [
  { title: 'Client', items: clientItems },
  { title: 'Server', items: serverItems }
]

const initialValues = {
  email: '',
  password: ''
}

const HeaderSection = ({ history }) => {
  const onFormSuccess = () => history.push('/login', { message: 'Signup Successful. Login Below.' })

  const renderListItem = ({ title, items }) => (
    <div className='col' key={title}>
      <h2 className='display-5 text-left'>{title}:</h2>
      <ul className='list-unstyled text-left'>
        {items.map((item, id) => {
          return (
            <li key={id}>
              <i className='fa fa-check m-2' />
              <span className='h5'>{item.label}</span>
            </li>
          )
        })}

      </ul>
    </div>
  )

  return (
    <div>
      <header id='home-section'>
        <div className='dark-overlay'>
          <div className='home-inner'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-6 d-none d-lg-block text-white'>
                  {/* <h1 className='display-5 text-left' style={{ marginTop: -15 }}>
                    <strong>Live Forum</strong> is an application that demonstrates how a <em>realtime</em> forum works.
                  </h1> */}
                  <div className='row pt-2'>
                    {listItems.map(renderListItem)}
                  </div>

                </div>

                <div className='col-lg-6'>
                  <div className='mw7 center ph3 ph5-ns tc br2 pa5 bg-near-black white mb5'>
                    <h2 className='fw-1'>Sign Up Now</h2>
                    <hr />
                    <UserFormCreate
                      onSubmitAction={formData => User.create(formData)}
                      onSuccessAction={onFormSuccess}
                      initialValues={initialValues}
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default withRouter(HeaderSection)
