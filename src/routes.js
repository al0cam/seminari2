import NewPerson from "@/components/Person/NewPerson";
import Persons from "@/components/Person/Persons";
import EditPerson from "@/components/Person/EditPerson";
import ViewPerson from "@/components/Person/ViewPerson";

export const routes=[
    {path: '/newperson', component: NewPerson},
    {path: '/', component: Persons},
    {path: '/editperson/:id', component: EditPerson},
    {path: '/viewperson/:id', component: ViewPerson}
]
