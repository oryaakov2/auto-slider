import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {

  const [persons, setPersons] = useState(data)
  const [index, setIndex] = useState(0)

  const onClickNextHandler = () => {
    if (index === data.length - 1) {
      setIndex(0)
      return;
    }
    setIndex((index) => index + 1)
  }

  const onClickPrevHandler = () => {
    if (index === 0) {
      setIndex(data.length - 1)
      return;
    }
    setIndex((index) => index - 1)
  }

  const autoPlay = () => {
    if (index === data.length - 1) {
      setIndex(0)
      return;
    }

    setIndex(index + 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      autoPlay()
    }, 3000)

    return () => clearInterval(interval)

  }, [index])

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>
          Reviews
        </h2>
      </div>
      <div className="section-center">
        {persons.map((person, personIndex) => {
          let position = 'nextSlide'

          if (personIndex === index) {
            position = 'activeSlide'

          } if (personIndex === index - 1 || (index === 0 && personIndex === persons.length - 1)) {
            position = 'lastSlide';
          }

          return (
            <article key={person.id} className={position}>
              <img src={person.image} alt={person.name} className="person-img" />
              <h4>{person.name}</h4>
              <p className="title">{person.title}</p>
              <p className="text">{person.quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          )
        })}
        <button className="prev" type="button" onClick={onClickPrevHandler}>
          <FiChevronLeft />
        </button>
        <button className="next" type="button" onClick={onClickNextHandler}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  )
}

export default App;
