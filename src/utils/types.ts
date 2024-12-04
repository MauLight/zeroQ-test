export interface OfficesProps {
    id: number
    lines: Array<{ waiting: number, elapsed: number }>
    name: string
    online: boolean
    waiting: number
}