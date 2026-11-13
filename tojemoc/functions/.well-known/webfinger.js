export const onRequest = ({ request }) => {
  const url = new URL(request.url);
  return Response.redirect(`https://pf.tjm.sk${url.pathname}${url.search}`, 301);
};
