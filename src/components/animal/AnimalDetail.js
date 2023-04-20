import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getAnimalById, releaseAnimal } from "../../managers/animals"

import "./Animals.css"

export const AnimalDetails = () => {
  const [animal, setAnimal] = useState({ location: {}, customer: {} })
  const { animalId } = useParams()
  const navigate = useNavigate()

  // Joining Data for Python Kennel https://github.com/nashville-software-school/bangazon-llc/blob/cohort-62/book-2-database/chapters/PK_SQL_JOINS.md
  // const animals = useAnimals()
  // const locations = useLocations()

  // const findLocation = (locationId) => {
  //   return locations.find(location => location.id === locationId)
  //   }

  // const animalsWithEmbeddedLocation = animals.map(animal => {
  //   animal.location = findLocation(animal.locationId)
  // })

  useEffect(() => {
    getAnimalById(animalId)
      .then(setAnimal)
  }, [animalId])

  return (
    <section className="animal">
      <h3 className="animal__name">{animal.name}</h3>
      <div className="animal__breed">{animal.breed}</div>
      <div className="animal__location">Location: {animal.location?.name}</div>
      <div className="animal__owner">Customer: {animal.customer?.name}</div>
      <div className="animal__status">Status: {animal.status}</div>

      <button onClick={() => releaseAnimal(animal.id).then(() => navigate("/animals"))} >Release Animal</button>

      <button onClick={() => {
        navigate(`/animals/edit/${animal.id}`)
      }}>Edit</button>
    </section>
  )
}
