import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { PostEntry } from "./postEntry.model";

@Injectable({ providedIn: "root" })
export class PostDataService {

    public maxId!: number;

    constructor(private http: HttpClient) { }

    updateEntry(id: string, entry: PostEntry) {

        this.http.put<{ message: string }>('http://localhost:3000/update-entry/' + id, entry).subscribe((jsonData) => {
            console.log(jsonData.message);
            this.getPostEntries();
        })
    }

    public PostSubject = new Subject<PostEntry[]>();
    private PostEntries: PostEntry[] = [];

    onDeleteEntry(id: string) {

        this.http.delete<{ message: string }>('http://localhost:3000/remove-entry/' + id).subscribe((jsonData) => {
            console.log(jsonData.message);
            this.getPostEntries();
        })

    }

    getPostEntries() {

        this.http.get<{ PostEntries: any }>('http://localhost:3000/Post-entries')
            .pipe(map((responseData) => {
                return responseData.PostEntries?.map((entry: { year: string; entry: string; _id: string }) => {
                    return {
                        year: entry.year,
                        entry: entry.entry,
                        id: entry._id
                    }
                })
            }))
            .subscribe((updateResponse) => {
                this.PostEntries = updateResponse;
                this.PostSubject.next(this.PostEntries);
            })

    }

    getPostEntry(id: string) {

        const index = this.PostEntries.findIndex(el => {
            return el.id == id;
        })
        return this.PostEntries[index];

    }

    onAddPostEntry(PostEntry: PostEntry) {

        this.http.post('http://localhost:3000/add-entry', PostEntry, { responseType: 'json' as const }).subscribe(res => {
            return this.getPostEntries();
        })

    }
}