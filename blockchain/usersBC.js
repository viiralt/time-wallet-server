exports.addUser = (ctx, userId) => {
  const factory = ctx.businessNetwork.getBusinessNetwork().getFactory();
  const userBC = factory.newResource('org.acme.biznet', 'User', userId)
  userBC.firstName = ctx.request.body.firstName;
  userBC.lastName = ctx.request.body.lastName;
  ctx.businessNetwork.getParticipantRegistry('org.acme.biznet.User')
  .then(usersRegistry => {usersRegistry.add(userBC)})
}
