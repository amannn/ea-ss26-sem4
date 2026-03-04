export default function Person({
  firstName,
  lastName
}: {
  firstName: string;
  lastName?: string;
}) {
  console.log(firstName);
  return (
    <p>
      <span>{firstName}</span> {lastName != null && <span>{lastName}</span>}
    </p>
  );
}
