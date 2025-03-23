import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {
  const { companies } = useSelector(store => store.company);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {
          companies?.map((company) => (
            <tr>

            <TableCell>
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTfemW60O6yZF8REvbRfI9j-L5klm89rR5UQQXKNN1H--p2nakzSVXLmnhfQAlBqhu-W4&usqp=CAU" alt="profile" />
            </Avatar>
          </TableCell>

          <TableCell>{company.name}</TableCell>
          <TableCell>{company.createdAt.split("T")[0]}</TableCell>
          <TableCell className="text-right cursor-pointer">
            <Popover>
              <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
              <PopoverContent className="w-32">
                <div className='flex items-center gap-2 w-fit cursor-pointer'>
                  <Edit2 className='w-4' />
                  <span>Edit</span>
                </div>
              </PopoverContent>
            </Popover>
          </TableCell>
            </tr>
          )
        
        )}
          
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable



