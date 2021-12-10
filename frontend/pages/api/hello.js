const handler = ("/" , (req , res) => 
{
  res.status(200).json({ name : "Diego" })
})

export default handler