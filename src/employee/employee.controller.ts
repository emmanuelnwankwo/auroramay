import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  async create(@Res() res, @Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const record = await this.employeeService.create(createEmployeeDto);
      return res.status(HttpStatus.CREATED).json({
        status: 'success',
        data: record
      });
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const records = await this.employeeService.findAll();
      if (records !== null && records.length > 0) {
        return res.status(HttpStatus.OK).json({
          status: 'success',
          employees: records
        });
      }
      return res.status(HttpStatus.NOT_FOUND).json({
        status: 'fail'
      });
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const record = await this.employeeService.findOne(id);
      return res.status(HttpStatus.OK).json({
        status: 'success',
        employee: record
      });
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Res() res, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const record = await this.employeeService.update(id, updateEmployeeDto);
      return res.status(HttpStatus.OK).json({
        status: 'success',
        employee: record
      });
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      await this.employeeService.remove(id);
      return res.status(HttpStatus.OK).json({
        status: 'success'
      });
    } catch (error) {
      return res.status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'fail',
        error: error.message
      });
    }
  }
}
