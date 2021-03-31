export interface Adapter<T, K> {
	adapt(item: T): K;
}
