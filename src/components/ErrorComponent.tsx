export function ErrorComponent({ msg, status }: { msg: string, status: number }) {
    return (
      	<div>
        	<h1> {status}: {msg}</h1>
      	</div>
    )
}