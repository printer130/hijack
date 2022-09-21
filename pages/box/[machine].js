export default function Machines () {
  return <>
    <h1>Hola q ace</h1>
  </>
}

export async function getStaticPaths() {

  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, // can also be true or 'blocking'
  }
}


export async function getStaticProps(context) {
  return {
    // Passed to the page component as props
    props: { post: {} },
  }
}