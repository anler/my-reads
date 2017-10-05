/* global URLSearchParams */

export const getQueryParam = (queryString, param, defaultValue) =>
  (new URLSearchParams(queryString)).get(param) || defaultValue || ""

export const updateQueryParam = (queryString, param, value) => {
  const params = new URLSearchParams(queryString)
  params.set(param, value)
  return params.toString()
}
