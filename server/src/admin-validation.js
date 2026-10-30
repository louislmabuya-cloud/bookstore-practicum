const categories = new Set(['Fiction', 'Nonfiction'])

export function validateBook(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { error: 'Enter the book details and try again.' }
  }

  const title = typeof input.title === 'string' ? input.title.trim() : ''
  const author = typeof input.author === 'string' ? input.author.trim() : ''
  const category =
    typeof input.category === 'string' ? input.category.trim() : ''
  const description =
    typeof input.description === 'string' ? input.description.trim() : ''
  const image = typeof input.image === 'string' ? input.image.trim() : ''
  const price = Number(input.price)
  const priceCents = Math.round(price * 100)

  if (!title || title.length > 200) {
    return { error: 'Title is required and must be 200 characters or fewer.' }
  }

  if (!author || author.length > 200) {
    return { error: 'Author is required and must be 200 characters or fewer.' }
  }

  if (!categories.has(category)) {
    return { error: 'Choose Fiction or Nonfiction for the category.' }
  }

  if (!description || description.length > 5000) {
    return {
      error: 'Description is required and must be 5,000 characters or fewer.',
    }
  }

  if (
    !Number.isFinite(price) ||
    price <= 0 ||
    !Number.isSafeInteger(priceCents) ||
    Math.abs(price * 100 - priceCents) > 0.001
  ) {
    return { error: 'Enter a price greater than zero with at most two decimals.' }
  }

  if (
    !image ||
    image.length > 500 ||
    (!image.startsWith('/images/') && !/^https:\/\//i.test(image))
  ) {
    return {
      error: 'Image must be an /images/ path or a secure HTTPS address.',
    }
  }

  if (
    (input.staffPick !== undefined && typeof input.staffPick !== 'boolean') ||
    (input.featured !== undefined && typeof input.featured !== 'boolean')
  ) {
    return { error: 'Staff pick and featured must be true or false.' }
  }

  return {
    value: {
      title,
      author,
      category,
      description,
      price: priceCents / 100,
      image,
      staffPick: input.staffPick === true,
      featured: input.featured === true,
    },
  }
}
